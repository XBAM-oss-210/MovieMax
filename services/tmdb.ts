/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const REVALIDATE_SECONDS = 3600;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type MediaType = "film" | "tv";

export type ImageSize = "w300" | "w500" | "w780" | "original";

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
    media_type?: "movie" | "tv";
};

export type Genre = {
    id: number;
    name: string;
};

export type Video = {
    key: string;
    site: string;
    type: string;
    official: boolean;
};

export type MediaDetails = Media & {
    tagline?: string;
    vote_count: number;
    runtime?: number;
    number_of_seasons?: number;
    number_of_episodes?: number;
    original_language: string;
    genres: Genre[];
    videos: { results: Video[] };
    seasons?: Season[]; 
};

export type TMDBResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
};

export type Season = {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    air_date: string | null;
};

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

export class TMDBError extends Error {
    constructor(public readonly status: number) {
        super(`Erreur TMDB : ${status}`);
        this.name = "TMDBError";
    }
}

async function tmdbFetch<T>(endpoint: string): Promise<T> {
    const token = process.env.TMDB_ACCESS_TOKEN;

    if (!token) {
        throw new Error("TMDB_ACCESS_TOKEN est manquante");
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
        },
        next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
        throw new TMDBError(response.status);
    }

    return response.json();
}

export const getImageUrl = (path: string | null, size: ImageSize = "w500") =>
    path ? `${IMAGE_BASE_URL}/${size}${path}` : "/placeholder.png";

/* -------------------------------------------------------------------------- */
/*                                   Listes                                   */
/* -------------------------------------------------------------------------- */

export type MovieSort =
    | "popularity.desc"
    | "vote_average.desc"
    | "primary_release_date.desc";

export const getDiscoverMovies = (
    page = 1,
    sortBy: MovieSort = "popularity.desc",
) =>
    tmdbFetch<TMDBResponse<Media>>(
        `/discover/movie?language=fr-FR&include_adult=false&sort_by=${sortBy}&page=${page}`,
    );

export const getDiscoverSeries = (page = 1) =>
    tmdbFetch<TMDBResponse<Media>>(
        `/discover/tv?language=fr-FR&sort_by=popularity.desc&page=${page}`,
    );

const getList = (path: string) =>
    tmdbFetch<TMDBResponse<Media>>(`${path}?language=fr-FR`);

// Films
export const getTrendingMovies = () => getList("/trending/movie/week");
export const getTopRatedMovies = () => getList("/movie/top_rated");
export const getPopularMovies = () => getList("/movie/popular");
export const getNowPlayingMovies = () => getList("/movie/now_playing");

// Séries
export const getPopularSeries = () => getList("/tv/popular");
export const getOnTheAirSeries = () => getList("/tv/on_the_air");

/* -------------------------------------------------------------------------- */
/*                                   Détails                                  */
/* -------------------------------------------------------------------------- */

export async function getMediaDetails(
    id: string,
    mediaType: MediaType,
): Promise<MediaDetails | null> {
    const kind = mediaType === "tv" ? "tv" : "movie";

    try {
        return await tmdbFetch<MediaDetails>(
            `/${kind}/${id}?language=fr-FR&append_to_response=videos&include_video_language=fr,en`,
        );
    } catch (error) {
        if (error instanceof TMDBError && error.status === 404) return null;
        throw error;
    }
}



export type MovieGenre = {
    id: number;
    name: string;
    slug: string;
};

export const MOVIE_GENRES: MovieGenre[] = [
    { id: 28, name: "Action", slug: "action" },
    { id: 12, name: "Aventure", slug: "aventure" },
    { id: 35, name: "Comédie", slug: "comedie" },
    { id: 18, name: "Drame", slug: "drame" },
    { id: 27, name: "Horreur", slug: "horreur" },
    { id: 878, name: "Science-fiction", slug: "science-fiction" },
    { id: 53, name: "Thriller", slug: "thriller" },
];

export const getGenreBySlug = (slug: string) =>
    MOVIE_GENRES.find((genre) => genre.slug === slug);

export const getMoviesByGenre = (genreId: number, page = 1) =>
    tmdbFetch<TMDBResponse<Media>>(
        `/discover/movie?language=fr-FR&include_adult=false&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`,
    );




export const searchMedia = async (query: string): Promise<Media[]> => {
    const data = await tmdbFetch<TMDBResponse<Media>>(
        `/search/multi?language=fr-FR&include_adult=false&query=${encodeURIComponent(query)}&page=1`,
    );

    // L'endpoint renvoie aussi des personnes : on ne garde que films et séries
    return data.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv",
    );
};


