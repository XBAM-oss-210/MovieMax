"use server";

import {
    getDiscoverMovies,
    getDiscoverSeries,
    getMoviesByGenre,
    MOVIE_GENRES,
    type Media,
    type TMDBResponse,
} from "@/services/tmdb";

// TMDB refuse toute page au-delà de 500
const MAX_PAGE = 500;

export type MediaPage = {
    results: Media[];
    page: number;
    hasMore: boolean;
};

// Le client n'est jamais de confiance : on borne la valeur reçue
const clampPage = (page: number) =>
    Number.isInteger(page) ? Math.min(Math.max(page, 1), MAX_PAGE) : 1;

const toMediaPage = (data: TMDBResponse<Media>): MediaPage => ({
    results: data.results,
    page: data.page,
    hasMore: data.page < Math.min(data.total_pages, MAX_PAGE),
});

export async function loadMoviesPage(page: number): Promise<MediaPage> {
    return toMediaPage(await getDiscoverMovies(clampPage(page)));
}

export async function loadSeriesPage(page: number): Promise<MediaPage> {
    return toMediaPage(await getDiscoverSeries(clampPage(page)));
}

export async function loadGenrePage(
    genreId: number,
    page: number,
): Promise<MediaPage> {
    // Le client n'est jamais de confiance : on n'accepte que nos genres
    if (!MOVIE_GENRES.some((genre) => genre.id === genreId)) {
        throw new Error("Genre inconnu");
    }

    return toMediaPage(await getMoviesByGenre(genreId, clampPage(page)));
}