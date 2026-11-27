
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center bg-zinc-950 px-4 text-center">

            {/* Logo */}
            <Link
                href="/"
                className="mb-12 text-2xl font-extrabold tracking-tight text-white"
            >
                Movie<span className="text-red-600">MAX</span>
            </Link>

            {/* Icône */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <AlertTriangle size={30} strokeWidth={1.7} />
            </div>

            {/* Message */}
            <div className="max-w-md space-y-3">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Quelque chose s'est mal passé
                </h1>

                <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                    Une erreur inattendue nous empêche d'afficher cette page.
                    Pas de panique, vous pouvez réessayer.
                </p>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                >
                    <RefreshCw size={16} />
                    Réessayer
                </button>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
                >
                    <Home size={16} />
                    Retour à l'accueil
                </Link>
            </div>

            {/* Footer */}
            <p className="absolute bottom-6 text-xs text-zinc-600">
                MovieMAX · Votre univers cinéma
            </p>
        </div>
    );
}
