import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    MonitorPlay,
} from "lucide-react";
import { getMediaDetails } from "@/services/tmdb";
import { SERVERS } from "@/lib/constant";
import { Suspense } from "react";
import Loading from "@/app/loading";
import AdBlockTips from "@/components/AdBlockTips";

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{
        type?: string;
        server?: string;
        season?: string;
        episode?: string;
    }>;
};

// Un épisode = une saison + un numéro
type EpisodeRef = { season: number; episode: number };

// Lit un nombre positif dans l'URL, borné par `max`. Valeur invalide : 1.
const parsePositive = (value: string | undefined, max = 999) => {
    const parsed = Number.parseInt(value ?? "", 10);
    return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : 1;
};

// Remplace {id}, {season}, {episode} dans l'adresse du serveur
const buildUrl = (template: string, values: Record<string, number | string>) =>
    template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

const WatchPageContent = async ({ params, searchParams }: PageProps) => {
    const { id } = await params;
    const query = await searchParams;

    // L'id doit être un nombre, sinon 404
    if (!/^\d+$/.test(id)) notFound();

    const mediaType = query.type === "tv" ? "tv" : "film";
    const isSeries = mediaType === "tv";

    const media = await getMediaDetails(id, mediaType);
    if (!media) notFound();

    const title = media.title ?? media.name ?? "Titre inconnu";

    /* ---------------------------- Saisons / épisodes ---------------------------- */

    // On ignore la saison 0 (« épisodes spéciaux » chez TMDB) et les saisons vides
    const seasons = (media.seasons ?? []).filter(
        (item) => item.season_number > 0 && item.episode_count > 0,
    );
    const hasEpisodes = isSeries && seasons.length > 0;

    // Saison demandée dans l'URL, sinon la première saison disponible
    const requestedSeason = parsePositive(query.season);
    const currentSeason =
        seasons.find((item) => item.season_number === requestedSeason) ??
        seasons[0];

    const season = currentSeason?.season_number ?? 1;
    const episodeCount = currentSeason?.episode_count ?? 999;
    // L'épisode ne peut pas dépasser le nombre d'épisodes de la saison
    const episode = parsePositive(query.episode, episodeCount);

    // Liste [1, 2, 3, ... n] pour afficher un bouton par épisode
    const episodeNumbers = hasEpisodes
        ? Array.from({ length: episodeCount }, (_, index) => index + 1)
        : [];

    const seasonIndex = seasons.findIndex((item) => item.season_number === season);

    // Épisode précédent : le précédent de la saison, sinon le dernier de la saison d'avant
    let previous: EpisodeRef | null = null;
    // Épisode suivant : le suivant de la saison, sinon le 1er de la saison d'après
    let next: EpisodeRef | null = null;

    if (hasEpisodes) {
        if (episode > 1) {
            previous = { season, episode: episode - 1 };
        } else if (seasonIndex > 0) {
            const before = seasons[seasonIndex - 1];
            previous = {
                season: before.season_number,
                episode: before.episode_count,
            };
        }

        if (episode < episodeCount) {
            next = { season, episode: episode + 1 };
        } else if (seasonIndex < seasons.length - 1) {
            next = { season: seasons[seasonIndex + 1].season_number, episode: 1 };
        }
    }

    /* --------------------------------- Lecteur --------------------------------- */

    const serverIndex = parsePositive(query.server, SERVERS.length) - 1;
    const server = SERVERS[serverIndex];

    const playerUrl = buildUrl(isSeries ? server.tvUrl : server.movieUrl, {
        id,
        season,
        episode,
    });

    // Construit un lien vers cette page. Ce qu'on ne précise pas reste inchangé :
    // watchHref({ episode: 5 }) garde le même serveur et la même saison.
    const watchHref = (target: {
        server?: number;
        season?: number;
        episode?: number;
    }) => {
        const search = new URLSearchParams({
            type: mediaType,
            server: String(target.server ?? serverIndex + 1),
        });

        if (isSeries) {
            search.set("season", String(target.season ?? season));
            search.set("episode", String(target.episode ?? episode));
        }

        return `/watch/${id}?${search.toString()}`;
    };

    // Style commun aux boutons « actif / inactif »
    const buttonStyle = (active: boolean) =>
        active
            ? "bg-red-600 text-white"
            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700";

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-6 text-white sm:px-6 lg:px-10">
            <Link
                href={`/movies/${id}?type=${mediaType}`}
                className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
                <ArrowLeft size={16} />
                Retour aux détails
            </Link>

            <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
                {title}
                {isSeries && (
                    <span className="ml-3 text-base font-medium text-zinc-400">
                        Saison {season} · Épisode {episode}
                    </span>
                )}
            </h1>

            {/* Lecteur : key force le rechargement quand l'adresse change */}
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-black">
                <iframe
                    key={playerUrl}
                    src={playerUrl}
                    title={`Lecture de ${title}`}
                    allow="autoplay; fullscreen; encrypted-media"
                    allowFullScreen
                    referrerPolicy="origin"
                    className="h-full w-full"
                />
                {/* <ZenixPlayer /> */}
            </div>

            {/* Épisode précédent / suivant (séries uniquement) */}
            {hasEpisodes && (
                <div className="mt-3 flex items-center justify-between gap-3">
                    {previous ? (
                        <Link
                            href={watchHref(previous)}
                            className="flex items-center gap-1.5 rounded-md bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-700"
                        >
                            <ChevronLeft size={16} />
                            Précédent
                        </Link>
                    ) : (
                        <span className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-600">
                            <ChevronLeft size={16} />
                            Précédent
                        </span>
                    )}

                    {next ? (
                        <Link
                            href={watchHref(next)}
                            className="flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                        >
                            Suivant
                            <ChevronRight size={16} />
                        </Link>
                    ) : (
                        <span className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-600">
                            Suivant
                            <ChevronRight size={16} />
                        </span>
                    )}
                </div>
            )}

            {/* Choix du serveur */}
            <div className="mt-5 space-y-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <MonitorPlay size={16} />
                    Choisir un serveur
                </p>

                <div className="flex flex-wrap gap-3">
                    {SERVERS.map((item, index) => (
                        <Link
                            key={item.name}
                            href={watchHref({ server: index + 1 })}
                            aria-current={index === serverIndex ? "true" : undefined}
                            className={`rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${buttonStyle(
                                index === serverIndex,
                            )}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <p className="text-xs text-zinc-500">
                    Si la vidéo ne se lance pas, essaie un autre serveur.
                </p>
            </div>
            <AdBlockTips />
            {/* Saisons et épisodes (séries uniquement) */}
            {hasEpisodes && (
                <div className="mt-3 space-y-3">
                    {/* Une saison = un bouton. On revient à l'épisode 1 en changeant de saison. */}
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-zinc-300">
                            Saisons
                        </p>

                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {seasons.map((item) => (
                                <Link
                                    key={item.id}
                                    href={watchHref({
                                        season: item.season_number,
                                        episode: 1,
                                    })}
                                    aria-current={
                                        item.season_number === season
                                            ? "true"
                                            : undefined
                                    }
                                    className={`shrink-0 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${buttonStyle(
                                        item.season_number === season,
                                    )}`}
                                >
                                    S{item.season_number}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Un épisode = un bouton. La liste défile si la saison est longue. */}
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-zinc-300">
                            Episodes 
                        </p>

                        <div className="grid max-h-64 grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-2 overflow-y-auto pr-1">
                            {episodeNumbers.map((number) => (
                                <Link
                                    key={number}
                                    href={watchHref({ episode: number })}
                                    aria-current={
                                        number === episode ? "true" : undefined
                                    }
                                    className={`flex h-11 items-center justify-center rounded-md text-sm font-semibold transition-colors ${buttonStyle(
                                        number === episode,
                                    )}`}
                                >
                                    {number}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Suspense : affiche <Loading /> pendant que les paramètres d'URL et TMDB répondent
const WatchPage = (props: PageProps) => (
    <Suspense fallback={<Loading />}>
        <WatchPageContent {...props} />
    </Suspense>
);

export default WatchPage;