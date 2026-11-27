"use client";

import { useEffect, useRef, useState } from "react";
import MediaCard from "@/components/MediaCard";
import { useFavorites } from "@/context/FavoritesContext";
import { getFavoriteMedia, type FavoriteMedia } from "@/app/action/favorites";
import Link from "next/link";
import { Clapperboard, Heart } from "lucide-react";

export default function FavoritesPage() {
    const { favorites, isLoaded, isFavorite } = useFavorites();
    const [items, setItems] = useState<FavoriteMedia[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetched = useRef(false);

    // Un seul chargement au départ
    useEffect(() => {
        if (!isLoaded || hasFetched.current) return;
        hasFetched.current = true;

        if (favorites.length === 0) {
            setIsLoading(false);
            return;
        }

        getFavoriteMedia(favorites)
            .then(setItems)
            .finally(() => setIsLoading(false));
    }, [isLoaded, favorites]);

    // Si on retire un favori ici, la carte disparaît sans recharger
    const visible = items.filter(({ media, type }) =>
        isFavorite(media.id, type),
    );

    return (
        <div className="min-h-screen bg-zinc-950 px-6 py-8 text-white md:px-12">
            <h1 className="mb-6 text-2xl font-bold">Mes favoris</h1>


            {isLoading ? (
                null
            ) : visible.length === 0 ? (
                <div className="flex min-h-[55vh] flex-col items-center justify-center px-4 text-center">

                    {/* Icône */}
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
                        <Heart
                            size={34}
                            strokeWidth={1.5}
                            className="text-zinc-500"
                        />
                    </div>

                    {/* Message */}
                    <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        Votre collection est vide
                    </h2>

                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
                        Les films et séries que vous ajouterez à vos favoris
                        apparaîtront ici. Trouvez votre prochain coup de cœur !
                    </p>

                    {/* Action */}
                    <Link
                        href="/"
                        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                    >
                        <Clapperboard size={17} />
                        Découvrir des films
                    </Link>

                </div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {visible.map(({ media, type }) => (
                        <MediaCard
                            key={`${type}-${media.id}`}
                            media={media}
                            mediaType={type}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}