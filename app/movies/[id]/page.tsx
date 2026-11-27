import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, Languages, Layers, Star } from "lucide-react";
import { getImageUrl, getMediaDetails } from "@/services/tmdb";
import DetailActions from "@/components/DetailsAction";
import { Suspense } from "react";
import Loading from "@/app/loading";
type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ type?: string }>;
};

const MovieDetailContent = async ({ params, searchParams }: PageProps) => {    const { id } = await params;
    const { type } = await searchParams;

    if (!/^\d+$/.test(id)) notFound();

    const mediaType = type === "tv" ? "tv" : "film";
    const media = await getMediaDetails(id, mediaType);

    if (!media) notFound();

    const title = media.title ?? media.name ?? "Titre inconnu";
    const date = media.release_date ?? media.first_air_date;

    const formattedDate = date
        ? new Date(date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })
            : "Date inconnue";

    const language =
        new Intl.DisplayNames(["fr"], { type: "language" }).of(
            media.original_language,
        ) ?? media.original_language;

    const trailer =
        media.videos.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer",
        ) ?? media.videos.results.find((v) => v.site === "YouTube");

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            {/* Grande image pleine largeur */}
            <section className="relative h-[60vh] w-full">
                {media.backdrop_path ? (
                    <Image
                        src={getImageUrl(media.backdrop_path, "original")}
                        alt={title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="h-full w-full bg-zinc-800" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

                <div className="absolute bottom-0 w-full px-6 pb-8 md:px-12">
                    <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
                    {media.tagline && (
                        <p className="mt-2 text-zinc-300 italic">
                            {media.tagline}
                        </p>
                    )}
                </div>
            </section>

            {/* Contenu */}
            <section className="grid gap-8 px-6 py-8 md:grid-cols-[auto_1fr] md:px-12">
                {media.poster_path && (
                    <Image
                        src={getImageUrl(media.poster_path)}
                        alt={`Affiche de ${title}`}
                        width={220}
                        height={330}
                        className="hidden rounded-lg md:block"
                    />
                )}

                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
                        <span className="flex items-center gap-1.5">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            {media.vote_average.toFixed(1)}
                            <span className="text-zinc-500">
                                ({media.vote_count} votes)
                            </span>
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            {formattedDate}
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Languages size={16} />
                            {language}
                        </span>

                        {media.runtime ? (
                            <span className="flex items-center gap-1.5">
                                <Clock size={16} />
                                {media.runtime} min
                            </span>
                        ) : null}

                        {media.number_of_seasons ? (
                            <span className="flex items-center gap-1.5">
                                <Layers size={16} />
                                {media.number_of_seasons} saison
                                {media.number_of_seasons > 1 && "s"}
                            </span>
                        ) : null}
                    </div>

                    {/* Catégories */}
                    <ul className="flex flex-wrap gap-2">
                        {media.genres.map((genre) => (
                            <li
                                key={genre.id}
                                className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
                            >
                                {genre.name}
                            </li>
                        ))}
                    </ul>

                    <p className="max-w-3xl leading-relaxed text-zinc-300">
                        {media.overview || "Aucune description disponible."}
                    </p>

                    <DetailActions
                        id={media.id}
                        type={mediaType}
                        hasTrailer={Boolean(trailer)}
                        title={title}
                    />
                </div>
            </section>

            {/* Bande annonce */}
            {trailer && (
                <section
                    id="bande-annonce"
                    className="scroll-mt-6 px-6 pb-12 md:px-12"
                >
                    <h2 className="mb-4 text-xl font-semibold">Bande-annonce</h2>
                    <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-lg">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                            title={`Bande-annonce de ${title}`}
                            allow="encrypted-media; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                        />
                    </div>
                </section>
            )}
        </main>
    );
};

const MovieDetail = (props: PageProps) => (
    <Suspense fallback={<Loading />}>
        <MovieDetailContent {...props} />
    </Suspense>
);

export default MovieDetail;