import {
    ChevronRight,
    Clapperboard,
    Compass,
    Flame,
    Sparkles,
    Trophy,
    Tv,
    type LucideIcon,
} from "lucide-react";
import Hero from "@/components/Hero";
import MediaCard from "@/components/MediaCard";
import {
    getTrendingMovies,
    getTopRatedMovies,
    getPopularMovies,
    getPopularSeries,
    getNowPlayingMovies,
    getOnTheAirSeries,
    type Media,
    type MediaType,
} from "@/services/tmdb";
import Link from "next/link";
import RandomMediaPicker from "@/components/RandomMediaPicker";

// Classes écrites en entier : Tailwind ne détecte pas les classes assemblées dynamiquement
const ACCENTS = {
    violet: {
        icon: "bg-violet-500/15 text-violet-400 ring-violet-500/30",
        badge: "bg-violet-500/15 text-violet-300",
        titleTo: "to-violet-300",
        line: "from-violet-500/40",
    },
    amber: {
        icon: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
        badge: "bg-amber-500/15 text-amber-300",
        titleTo: "to-amber-300",
        line: "from-amber-500/40",
    },
    red: {
        icon: "bg-red-500/15 text-red-400 ring-red-500/30",
        badge: "bg-red-500/15 text-red-300",
        titleTo: "to-red-300",
        line: "from-red-500/40",
    },
    fuchsia: {
        icon: "bg-fuchsia-500/15 text-fuchsia-400 ring-fuchsia-500/30",
        badge: "bg-fuchsia-500/15 text-fuchsia-300",
        titleTo: "to-fuchsia-300",
        line: "from-fuchsia-500/40",
    },
    sky: {
        icon: "bg-sky-500/15 text-sky-400 ring-sky-500/30",
        badge: "bg-sky-500/15 text-sky-300",
        titleTo: "to-sky-300",
        line: "from-sky-500/40",
    },
    emerald: {
        icon: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
        badge: "bg-emerald-500/15 text-emerald-300",
        titleTo: "to-emerald-300",
        line: "from-emerald-500/40",
    },
} as const;

type MediaSection = {
    title: string;
    subtitle: string;
    items: Media[];
    mediaType: MediaType;
    icon: LucideIcon;
    accent: keyof typeof ACCENTS;
};

export default async function Home() {
    const [trending, topRated, popular, popularSeries, nowPlaying, onTheAir] =
        await Promise.all([
            getTrendingMovies(),
            getTopRatedMovies(),
            getPopularMovies(),
            getPopularSeries(),
            getNowPlayingMovies(),
            getOnTheAirSeries(),
        ]);

    const sections: MediaSection[] = [
        {
            title: "À découvrir",
            subtitle: "Des films sélectionnés pour vous",
            items: popular.results,
            mediaType: "film",
            icon: Compass,
            accent: "violet",
        },
        {
            title: "Les mieux notés",
            subtitle: "Les films qui ont marqué les spectateurs",
            items: topRated.results,
            mediaType: "film",
            icon: Trophy,
            accent: "amber",
        },
        {
            title: "Tendances du moment",
            subtitle: "Ce qui fait parler de soi actuellement",
            items: trending.results,
            mediaType: "film",
            icon: Flame,
            accent: "red",
        },
        {
            title: "Séries incontournables",
            subtitle: "Des séries à ne surtout pas manquer",
            items: popularSeries.results,
            mediaType: "tv",
            icon: Tv,
            accent: "fuchsia",
        },
        {
            title: "Dernières sorties cinéma",
            subtitle: "Les films récemment arrivés au cinéma",
            items: nowPlaying.results,
            mediaType: "film",
            icon: Clapperboard,
            accent: "sky",
        },
        {
            title: "Nouvelles séries",
            subtitle: "Les séries actuellement diffusées",
            items: onTheAir.results,
            mediaType: "tv",
            icon: Sparkles,
            accent: "emerald",
        },
    ];
    const randomMovies = [
        ...new Map(
            [
                ...popular.results,
                ...topRated.results,
                ...trending.results,
                ...nowPlaying.results,
            ].map((media) => [media.id, media]),
        ).values(),
    ];

    const randomSeries = [
        ...new Map(
            [
                ...popularSeries.results,
                ...onTheAir.results,
            ].map((media) => [media.id, media]),
        ).values(),
    ];

    return (
        <>
            <Hero />
            <RandomMediaPicker
                movies={randomMovies}
                series={randomSeries}
            />
            <div className="space-y-10 px-4 py-10 sm:px-6 lg:space-y-14 lg:px-10">
                {sections.map((section) => {
                    const accent = ACCENTS[section.accent];
                    const Icon = section.icon;

                    return (
                        <section key={section.title} className="min-w-0">
                            {/* En-tête de section */}
                            <div className="mb-5 flex items-center gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${accent.icon}`}
                                >
                                    <Icon size={22} />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase ${accent.badge}`}
                                        >
                                            {section.mediaType === "tv"
                                                ? "Séries"
                                                : "Films"}
                                        </span>
                                    </div>

                                    <h2
                                        className={`mt-1 bg-linear-to-r from-white ${accent.titleTo} bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl`}
                                    >
                                        {section.title}
                                    </h2>

                                    <p className="mt-0.5 text-xs font-medium text-zinc-500 sm:text-sm">
                                        {section.subtitle}
                                    </p>
                                </div>

                                {/* Trait lumineux */}
                                <div
                                    className={`hidden h-px flex-1 bg-linear-to-r ${accent.line} to-transparent sm:block`}
                                />

                                <Link
                                    href={section.mediaType === "tv" ? "/series" : "/movies"}
                                    className="group ml-auto flex shrink-0 items-center gap-1 rounded-full border border-zinc-700 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-white sm:ml-0"
                                >
                                    Explorer
                                    <ChevronRight
                                        size={14}
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />
                                </Link>
                            </div>

                            {/* Carrousel des médias */}
                            <div className="scrollbar-hide flex gap-3 overflow-x-auto">
                                {section.items.map((media) => (
                                    <MediaCard
                                        key={media.id}
                                        media={media}
                                        mediaType={section.mediaType}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

        </>
    );
}