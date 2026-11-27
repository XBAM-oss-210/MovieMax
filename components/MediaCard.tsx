
"use client";

import Image from "next/image";
import { Play, Clapperboard, Tv, Heart } from "lucide-react";
import { getImageUrl } from "@/services/tmdb";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";

export type Media = {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
};

type MediaCardProps = {
    media: Media;
    mediaType: "film" | "tv";
};

const MediaCard = ({ media, mediaType }: MediaCardProps) => {
    const isFilm = mediaType === "film";

    const title = isFilm ? media.title : media.name;

    const date = isFilm
        ? media.release_date
        : media.first_air_date;

    const year = date
        ? new Date(date).getFullYear()
        : "Date inconnue";

    const router = useRouter();

    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(media.id, mediaType);

    const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleFavorite(media.id, mediaType);
    };
    const handleClick = () => {
        router.push(`/movies/${media.id}?type=${mediaType}`);
    };
    const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push(`/watch/${media.id}?type=${mediaType}`);
    };

    return (
        <article
            onClick={handleClick}
            className="group relative w-[clamp(6.5rem,10.5vw,10.5rem)] shrink-0 cursor-pointer overflow-hidden rounded-lg bg-zinc-900"
        >
            {/* Affiche */}
            <div className="relative aspect-2/3 w-full overflow-hidden">
                {media.poster_path ? (
                    <Image
                        src={getImageUrl(media.poster_path)}
                        alt={title || "Affiche du média"}
                        fill
                        sizes="(max-width: 640px) 104px, (max-width: 1200px) 140px, 168px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-800 text-xs text-zinc-500">
                        Affiche indisponible
                    </div>
                )}

                {/* Voile noir */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/45" />

                {/* Type */}
                <div className="absolute left-1.5 top-1.5">
                    <span
                        className={`flex items-center gap-1 rounded-md px-1.5 py-1 text-[10px] font-medium text-white sm:text-xs ${
                            isFilm ? "bg-red-600" : "bg-violet-600"
                        }`}
                    >
                        {isFilm ? (
                            <Clapperboard size={12} />
                        ) : (
                            <Tv size={12} />
                        )}
                        {isFilm ? "Film" : "Série"}
                    </span>
                </div>

                {/* Note */}
                <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-md bg-black/75 px-1.5 py-1 text-[10px] font-semibold text-white sm:text-xs">
                    ⭐ {media.vote_average.toFixed(1)}
                </div>

                {/* Favoris */}
                <button
                    onClick={handleFavorite}
                    aria-pressed={favorite}
                    aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className={`absolute right-1.5 top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                        favorite ? "bg-red-600" : "bg-black/65 hover:bg-red-600"
                    }`}
                >
                    <Heart size={14} className={favorite ? "fill-current" : ""} />
                </button>

                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                        onClick={handlePlay}
                        aria-label="Lire le média"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white transition-transform duration-300 hover:scale-110 hover:bg-red-500 sm:h-10 sm:w-10"
                    >
                        <Play
                            size={18}
                            fill="currentColor"
                            strokeWidth={1.5}
                            className="ml-0.5"
                        />
                    </button>
                </div>
            </div>

            {/* Informations */}
            <div className="space-y-0.5 p-2">
                <h3 className="truncate text-xs font-semibold text-white sm:text-sm">
                    {title || "Titre inconnu"}
                </h3>

                <p className="text-[10px] text-zinc-400 sm:text-xs">
                    {year}
                </p>
            </div>
        </article>
    );
};

export default MediaCard;
