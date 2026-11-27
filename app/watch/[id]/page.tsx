import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MonitorPlay, ShieldCheck } from "lucide-react";
import { getMediaDetails } from "@/services/tmdb";
import {SERVERS} from "@/lib/constant";
import { Suspense } from "react";
import Loading from "@/app/loading";

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{
        type?: string;
        server?: string;
        season?: string;
        episode?: string;
    }>;
};


const parsePositive = (value: string | undefined, max = 999) => {
    const parsed = Number.parseInt(value ?? "", 10);
    return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : 1;
};

const buildUrl = (template: string, values: Record<string, number | string>) =>
    template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

const WatchPageContent = async ({ params, searchParams }: PageProps) => {
    const { id } = await params;
    const query = await searchParams;

    if (!/^\d+$/.test(id)) notFound();

    const mediaType = query.type === "tv" ? "tv" : "film";
    const isSeries = mediaType === "tv";

    const media = await getMediaDetails(id, mediaType);
    if (!media) notFound();

    const title = media.title ?? media.name ?? "Titre inconnu";

    const serverIndex = parsePositive(query.server, SERVERS.length) - 1;
    const season = parsePositive(query.season, media.number_of_seasons ?? 999);
    const episode = parsePositive(query.episode);

    const server = SERVERS[serverIndex];
    const playerUrl = buildUrl(isSeries ? server.tvUrl : server.movieUrl, {
        id,
        season,
        episode,
    });

    const serverHref = (index: number) => {
        const params = new URLSearchParams({
            type: mediaType,
            server: String(index + 1),
        });

        if (isSeries) {
            params.set("season", String(season));
            params.set("episode", String(episode));
        }

        return `/watch/${id}?${params.toString()}`;
    };

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

            {/* Lecteur */}
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
                            href={serverHref(index)}
                            aria-current={index === serverIndex}
                            className={`rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${
                                index === serverIndex
                                    ? "bg-red-600 text-white"
                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <p className="text-xs text-zinc-500">
                    Si la vidéo ne se lance pas, essaie un autre serveur.
                </p>

            </div>

            {/* Saison et épisode (séries uniquement) */}
            {isSeries && (
                <form
                    method="get"
                    className="mt-6 flex flex-wrap items-end gap-3"
                >
                    <input type="hidden" name="type" value="tv" />
                    <input type="hidden" name="server" value={serverIndex + 1} />

                    <label className="space-y-1 text-xs text-zinc-400">
                        Saison
                        <input
                            type="number"
                            name="season"
                            min={1}
                            max={media.number_of_seasons ?? 99}
                            defaultValue={season}
                            className="block w-24 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
                        />
                    </label>

                    <label className="space-y-1 text-xs text-zinc-400">
                        Épisode
                        <input
                            type="number"
                            name="episode"
                            min={1}
                            defaultValue={episode}
                            className="block w-24 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
                        />
                    </label>

                    <button
                        type="submit"
                        className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold transition-colors hover:bg-red-500"
                    >
                        Lire
                    </button>
                </form>
            )}
        </div>
    );
};

const WatchPage = (props: PageProps) => (
    <Suspense fallback={<Loading />}>
        <WatchPageContent {...props} />
    </Suspense>
);

export default WatchPage;