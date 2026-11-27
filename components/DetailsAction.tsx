"use client";

import { Heart, Play } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import type { MediaType } from "@/services/tmdb";
import Link from "next/link";

type DetailActionsProps = {
    id: number;
    type: MediaType;
    hasTrailer: boolean;
    title: string;
};

const DetailActions = ({ id, type, hasTrailer, title }: DetailActionsProps) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(id, type);
    return (
        <div className="flex flex-wrap gap-3">


            <Link
                href={`/watch/${id}?type=${type}`}
                className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 font-semibold transition-colors hover:bg-red-500"
            >
                <Play size={18} fill="currentColor" />
                Regarder
            </Link>

            {hasTrailer && (
                <a
                    href="#bande-annonce"
                    className="flex items-center gap-2 rounded-md bg-zinc-800 px-5 py-2.5 font-semibold transition-colors hover:bg-zinc-700"
                >
                    Bande-annonce
                </a>
            )}

                <button
                    onClick={() => toggleFavorite(id, type)}
                    aria-pressed={favorite}
                    aria-label={`${favorite ? "Retirer" : "Ajouter"} ${title} ${favorite ? "des" : "aux"} favoris`}
                    className="flex items-center gap-2 rounded-md bg-zinc-800 px-5 py-2.5 font-semibold transition-colors hover:bg-zinc-700"
                >
                    <Heart size={18} className={favorite ? "fill-red-500 text-red-500" : ""} />
                    {favorite ? "Dans mes favoris" : "Ajouter aux favoris"}
                </button>
        </div>
    );
};

export default DetailActions;