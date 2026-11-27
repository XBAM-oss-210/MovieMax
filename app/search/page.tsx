import { Search } from "lucide-react";
import MediaCard from "@/components/MediaCard";
import { searchMedia } from "@/services/tmdb";
import { Suspense } from "react";
import Loading from "@/app/loading";
type PageProps = {
    searchParams: Promise<{ q?: string }>;
};

const SearchPageContent = async ({ searchParams }: PageProps) => {
      const { q } = await searchParams;

    const query = (q ?? "").trim().slice(0, 100);
    const results = query ? await searchMedia(query) : [];

    return (
        <section className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            {/* En-tête */}
            <header className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-br from-zinc-900 via-zinc-900 to-red-950/40 p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />

                <div className="relative flex items-center gap-4 sm:gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-400 ring-1 ring-red-500/30">
                        <Search size={26} />
                    </div>

                    <div className="min-w-0">
                        <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold tracking-widest text-red-300 uppercase">
                            Recherche
                        </span>

                        <h1 className="mt-1.5 truncate bg-linear-to-r from-white to-red-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                            {query ? `« ${query} »` : "Rechercher"}
                        </h1>

                        <p className="mt-1 text-sm font-medium text-zinc-400">
                            {query
                                ? `${results.length} résultat${results.length > 1 ? "s" : ""} parmi les films et séries`
                                : "Tape le nom d'un film ou d'une série dans la barre de recherche."}
                        </p>
                    </div>
                </div>
            </header>

            {/* Résultats */}
            {query && results.length === 0 ? (
                <p className="py-10 text-center text-zinc-400">
                    Aucun résultat pour « {query} ». Essaie une autre orthographe.
                </p>
            ) : (
                <div className="grid grid-cols-3 justify-items-center gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                    {results.map((media) => (
                        <MediaCard
                            key={`${media.media_type}-${media.id}`}
                            media={media}
                            mediaType={media.media_type === "tv" ? "tv" : "film"}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

const SearchPage = (props: PageProps) => (
    <Suspense fallback={<Loading />}>
        <SearchPageContent {...props} />
    </Suspense>
);

export default SearchPage;