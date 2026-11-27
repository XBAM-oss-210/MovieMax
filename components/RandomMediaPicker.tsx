
"use client";

import { useState } from "react";
import {  X, Shuffle, Film, Tv,  Dices } from "lucide-react";
import MediaCard from "@/components/MediaCard";
import type { Media, MediaType } from "@/services/tmdb";

type RandomMediaPickerProps = {
    movies: Media[];
    series: Media[];
};

export default function RandomMediaPicker({
    movies,
    series,
}: RandomMediaPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [selectedType, setSelectedType] = useState<MediaType | null>(null);

    const drawMedia = (type: MediaType) => {
        const collection = type === "film" ? movies : series;

        if (collection.length === 0) return;

        const randomIndex = Math.floor(Math.random() * collection.length);

        setSelectedMedia(collection[randomIndex]);
        setSelectedType(type);
    };

    const close = () => {
        setIsOpen(false);
        setSelectedMedia(null);
        setSelectedType(null);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                aria-label="Choisir un film ou une série au hasard"
                title="Surprends-moi : tirage aléatoire"
                className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:shadow-xl hover:shadow-red-600/30 active:scale-95"
            >
                <Dices
                    size={27}
                    strokeWidth={1.8}
                    className="animate-shake transition-transform duration-300 group-hover:rotate-12"
                />
            </button>
            {/* Fenêtre de sélection */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
                    onClick={close}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="random-title"
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
                    >
                        {/* Fermeture */}
                        <button
                            onClick={close}
                            aria-label="Fermer"
                            className="absolute right-4 top-4 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                        >
                            <X size={19} />
                        </button>

                        {/* En-tête */}
                        <div className="mb-7 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                                <Dices size={28} />
                            </div>

                            <h2
                                id="random-title"
                                className="text-xl font-bold text-white"
                            >
                                Surprends-moi !
                            </h2>

                            <p className="mt-2 text-sm text-zinc-400">
                                Laisse MovieMAX choisir ton prochain visionnage.
                            </p>
                        </div>

                        {/* Choix du type */}
                        {!selectedMedia ? (
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => drawMedia("film")}
                                    disabled={movies.length === 0}
                                    className="flex flex-col items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-white transition-all hover:border-red-500/50 hover:bg-red-500/5 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Film size={27} className="text-red-500" />
                                    <span className="text-sm font-semibold">
                                        Un film
                                    </span>
                                </button>

                                <button
                                    onClick={() => drawMedia("tv")}
                                    disabled={series.length === 0}
                                    className="flex flex-col items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-white transition-all hover:border-violet-500/50 hover:bg-violet-500/5 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Tv size={27} className="text-violet-400" />
                                    <span className="text-sm font-semibold">
                                        Une série
                                    </span>
                                </button>
                            </div>
                        ) : (
                            /* Résultat */
                            <div className="flex flex-col items-center">
                                <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-red-500">
                                    Ta sélection
                                </span>

                                <MediaCard
                                    media={selectedMedia}
                                    mediaType={selectedType!}
                                />

                                <button
                                    onClick={() => drawMedia(selectedType!)}
                                    className="mt-6 flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                                >
                                    <Shuffle size={16} />
                                    Un autre tirage
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedMedia(null);
                                        setSelectedType(null);
                                    }}
                                    className="mt-3 text-xs text-zinc-500 transition-colors hover:text-white"
                                >
                                    Changer de catégorie
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
