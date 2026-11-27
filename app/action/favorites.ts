"use server";

import { getMediaDetails, type MediaDetails } from "@/services/tmdb";
import type { FavoriteItem } from "@/context/FavoritesContext";

export type FavoriteMedia = {
    media: MediaDetails;
    type: FavoriteItem["type"];
};

const MAX_FAVORITES = 100;

export async function getFavoriteMedia(
    items: FavoriteItem[],
): Promise<FavoriteMedia[]> {
    // Les données du client ne sont jamais de confiance : on revalide
    const valid = items
        .filter(
            (item) =>
                Number.isInteger(item.id) &&
                item.id > 0 &&
                (item.type === "film" || item.type === "tv"),
        )
        .slice(0, MAX_FAVORITES);

    const results = await Promise.all(
        valid.map(async ({ id, type }) => {
            try {
                const media = await getMediaDetails(String(id), type);
                return media ? { media, type } : null;
            } catch {
                return null;
            }
        }),
    );

    return results.filter((result) => result !== null);
}