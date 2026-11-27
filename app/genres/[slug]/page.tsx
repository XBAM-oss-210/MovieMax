
import { loadGenrePage } from "@/app/action/media";
import { notFound } from "next/navigation";
import { Popcorn } from "lucide-react";
import MediaGrid from "@/components/MediaGrid";
import { getGenreBySlug, getMoviesByGenre } from "@/services/tmdb";
import { Suspense } from "react";
import Loading from "@/app/loading";

type PageProps = {
    params: Promise<{ slug: string }>;
};

const GenrePageContent = async ({ params }: PageProps) => {
        const { slug } = await params;
    const genre = getGenreBySlug(slug);

    if (!genre) notFound();

    // On fixe l'id du genre : MediaGrid n'a plus qu'à fournir la page
    const loadPage = loadGenrePage.bind(null, genre.id);
    const firstPage = await getMoviesByGenre(genre.id, 1);
    const hasMore = firstPage.page < Math.min(firstPage.total_pages, 500);

    return (
        <section className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            <header className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-br from-zinc-900 via-zinc-900 to-red-950/40 p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />

                <div className="relative flex items-center gap-4 sm:gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-400 ring-1 ring-red-500/30">
                        <Popcorn size={26} />
                    </div>

                    <div className="min-w-0">
                        <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold tracking-widest text-red-300 uppercase">
                            Genre
                        </span>

                        <h1 className="mt-1.5 bg-linear-to-r from-white to-red-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                            {genre.name}
                        </h1>

                        <p className="mt-1 text-sm font-medium text-zinc-400">
                            Les films {genre.name.toLowerCase()} les plus populaires.
                        </p>
                    </div>
                </div>
            </header>

            {/* key : réinitialise la grille quand on passe d'un genre à l'autre */}
            <MediaGrid
                key={genre.id}
                initialMedia={firstPage.results}
                initialPage={firstPage.page}
                initialHasMore={hasMore}
                mediaType="film"
                genreId={genre.id}
            />
        </section>
    );
};

const GenrePage = (props: PageProps) => (
    <Suspense fallback={<Loading />}>
        <GenrePageContent {...props} />
    </Suspense>
);

export default GenrePage;