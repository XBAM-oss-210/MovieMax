"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { MediaType } from "@/services/tmdb";

export type FavoriteItem = {
    id: number;
    type: MediaType;
};

type FavoritesContextValue = {
    favorites: FavoriteItem[];
    isLoaded: boolean;
    isFavorite: (id: number, type: MediaType) => boolean;
    toggleFavorite: (id: number, type: MediaType) => void;
};

const STORAGE_KEY = "moviemax:favorites";

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const isFavoriteItem = (value: unknown): value is FavoriteItem =>
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "type" in value &&
    typeof value.id === "number" &&
    (value.type === "film" || value.type === "tv");

function readStorage(): FavoriteItem[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter(isFavoriteItem) : [];
    } catch {
        return [];
    }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Lecture après le montage (évite l'erreur d'hydratation SSR)
    useEffect(() => {
        setFavorites(readStorage());
        setIsLoaded(true);
    }, []);

    // Sauvegarde à chaque changement
    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch {
            // stockage plein ou désactivé : on ignore
        }
    }, [favorites, isLoaded]);

    // Synchronisation entre onglets
    useEffect(() => {
        const onStorage = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY) setFavorites(readStorage());
        };

        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const isFavorite = useCallback(
        (id: number, type: MediaType) =>
            favorites.some((f) => f.id === id && f.type === type),
        [favorites],
    );

    const toggleFavorite = useCallback((id: number, type: MediaType) => {
        setFavorites((prev) =>
            prev.some((f) => f.id === id && f.type === type)
                ? prev.filter((f) => !(f.id === id && f.type === type))
                : [{ id, type }, ...prev],
        );
    }, []);

    const value = useMemo(
        () => ({ favorites, isLoaded, isFavorite, toggleFavorite }),
        [favorites, isLoaded, isFavorite, toggleFavorite],
    );

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites doit être utilisé dans un FavoritesProvider");
    }

    return context;
}