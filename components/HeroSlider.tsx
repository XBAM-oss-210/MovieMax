"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Info, Play, Star } from "lucide-react";
import { getImageUrl, type Media } from "@/services/tmdb";

const AUTOPLAY_MS = 6000;

type HeroSliderProps = {
    movies: Media[];
};

const HeroSlider = ({ movies }: HeroSliderProps) => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goTo = useCallback(
        (index: number) => setCurrent((index + movies.length) % movies.length),
        [movies.length],
    );

    // Défilement automatique (en pause au survol)
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % movies.length);
        }, AUTOPLAY_MS);

        return () => clearInterval(timer);
    }, [current, isPaused, movies.length]);

    return (
        <section
            className="relative h-[70vh] min-h-96 w-full overflow-hidden bg-zinc-950"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-roledescription="carrousel"
            aria-label="Films tendance"
        >
            {movies.map((movie, index) => {
                const isActive = index === current;
                const title = movie.title ?? movie.name ?? "Titre inconnu";
                const year = movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : null;
                const detailUrl = `/movies/${movie.id}?type=film`;

                return (
                    <div
                        key={movie.id}
                        aria-hidden={!isActive}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                            isActive
                                ? "opacity-100"
                                : "pointer-events-none opacity-0"
                        }`}
                    >
                        <Image
                            src={getImageUrl(movie.backdrop_path, "original")}
                            alt={title}
                            fill
                            priority={index === 0}
                            sizes="100vw"
                            className="object-cover"
                        />

                        {/* Dégradés pour la lisibilité du texte */}
                        <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />

                        <div className="absolute inset-0 flex items-end px-6 pb-16 md:px-16 md:pb-20">
                            <div className="max-w-xl space-y-4 text-white">
                                <span className="inline-block rounded-md bg-red-600 px-2.5 py-1 text-xs font-semibold">
                                    Tendance de la semaine
                                </span>

                                <h2 className="text-3xl font-bold md:text-5xl">
                                    {title}
                                </h2>

                                <div className="flex items-center gap-4 text-sm text-zinc-300">
                                    <span className="flex items-center gap-1.5">
                                        <Star
                                            size={16}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                    {year && <span>{year}</span>}
                                </div>

                                <p className="line-clamp-3 text-sm leading-relaxed text-zinc-300 md:text-base">
                                    {movie.overview ||
                                        "Aucune description disponible."}
                                </p>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link
                                        href={`/watch/${movie.id}?type=film`}
                                        tabIndex={isActive ? 0 : -1}
                                        className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 font-semibold transition-colors hover:bg-red-500"
                                    >
                                        <Play size={18} fill="currentColor" />
                                        Regarder
                                    </Link>

                                    <Link
                                        href={detailUrl}
                                        tabIndex={isActive ? 0 : -1}
                                        className="flex items-center gap-2 rounded-md bg-zinc-800/80 px-5 py-2.5 font-semibold backdrop-blur-sm transition-colors hover:bg-zinc-700"
                                    >
                                        <Info size={18} />
                                        Plus d&apos;infos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Flèches */}
            <button
                onClick={() => goTo(current - 1)}
                aria-label="Film précédent"
                className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-red-600 md:flex"
            >
                <ChevronLeft size={22} />
            </button>

            <button
                onClick={() => goTo(current + 1)}
                aria-label="Film suivant"
                className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-red-600 md:flex"
            >
                <ChevronRight size={22} />
            </button>

            {/* Indicateurs */}
            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {movies.map((movie, index) => (
                    <button
                        key={movie.id}
                        onClick={() => goTo(index)}
                        aria-label={`Aller au film ${index + 1}`}
                        aria-current={index === current}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === current
                                ? "w-6 bg-red-600"
                                : "w-2 bg-white/50 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;