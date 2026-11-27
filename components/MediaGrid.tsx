"use client";

import { useState } from "react";
import { ArrowDown, Loader2, Plus } from "lucide-react";
import MediaCard from "@/components/MediaCard";
import { loadGenrePage, type MediaPage } from "@/app/action/media";
import type { Media, MediaType } from "@/services/tmdb";




type MediaGridProps = {
    initialMedia: Media[];
    initialPage: number;
    initialHasMore: boolean;
    mediaType: MediaType;
    loadPage?: (page: number) => Promise<MediaPage>;
    genreId?: number;
};

const MediaGrid = ({
    initialMedia,
    initialPage,
    initialHasMore,
    mediaType,
    loadPage,
    genreId,
}: MediaGridProps) => {
    const [items, setItems] = useState(initialMedia);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const isSeries = mediaType === "tv";

    const handleLoadMore = async () => {
        setIsLoading(true);
        setHasError(false);

        try {
            const next =
                genreId !== undefined
                    ? await loadGenrePage(genreId, page + 1)
                    : await loadPage?.(page + 1);

            if (!next) return;

            // Le classement bouge : on évite les doublons entre deux pages
            setItems((prev) => {
                const ids = new Set(prev.map((item) => item.id));
                return [
                    ...prev,
                    ...next.results.filter((item) => !ids.has(item.id)),
                ];
            });
            setPage(next.page);
            setHasMore(next.hasMore);
        } catch {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="grid grid-cols-3 justify-items-center gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                {items.map((media) => (
                    <MediaCard
                        key={media.id}
                        media={media}
                        mediaType={mediaType}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center gap-3 pt-4">
                <p className="text-xs text-zinc-500">
                    {items.length} {isSeries ? "séries affichées" : "films affichés"}
                </p>

                {hasError && (
                    <p className="text-sm text-red-400">
                        Impossible de charger la suite. Réessaie.
                    </p>
                )}

                {hasMore ? (

                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="group flex min-w-45 items-center justify-center gap-3 rounded-full border border-zinc-700/80 bg-zinc-900/70 px-7 py-3 text-sm font-semibold text-zinc-200 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-red-500/60 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2
                                    size={17}
                                    className="animate-spin text-red-500"
                                />
                                <span>Chargement...</span>
                            </>
                        ) : (
                            <>
                                <span>Voir plus</span>
                                <ArrowDown
                                    size={17}
                                    className="text-zinc-400 transition-all duration-300 group-hover:translate-y-1 group-hover:text-red-500"
                                />
                            </>
                        )}
                    </button>

                ) : (
                    <p className="text-sm text-zinc-400">Tu as tout vu !</p>
                )}
            </div>
        </>
    );
};

export default MediaGrid;