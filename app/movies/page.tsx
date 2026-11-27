import { Clapperboard, Flame } from "lucide-react";
import MediaGrid from "@/components/mediaGrid";
import { loadMoviesPage } from "@/app/action/media";

const Movies = async () => {
    const firstPage = await loadMoviesPage(1);

    return (
        <section className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            {/* En-tête */}
            <header className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-br from-zinc-900 via-zinc-900 to-red-950/40 p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />

                <div className="relative flex items-center gap-4 sm:gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-400 ring-1 ring-red-500/30">
                        <Clapperboard size={26} />
                    </div>

                    <div className="min-w-0">
                        <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold tracking-widest text-red-300 uppercase">
                            Films
                        </span>

                        <h1 className="mt-1.5 bg-linear-to-r from-white to-red-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                            Tous les films
                        </h1>

                        <p className="mt-1 text-sm font-medium text-zinc-400">
                            Explorez notre collection de films.
                        </p>
                    </div>
                </div>
            </header>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
                <Flame size={18} className="text-red-400" />
                <h2 className="text-lg font-bold text-white">
                    Du plus populaire au moins populaire
                </h2>
                <div className="h-px flex-1 bg-linear-to-r from-red-500/40 to-transparent" />
            </div>
          <MediaGrid
              initialMedia={firstPage.results}
              initialPage={firstPage.page}
              initialHasMore={firstPage.hasMore}
              mediaType="film"
              loadPage={loadMoviesPage}
          />
        </section>
    );
};

export default Movies;