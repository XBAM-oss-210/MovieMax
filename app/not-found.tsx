
import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center bg-zinc-950 px-4 text-center">
            {/* Contenu */}
            <div className="space-y-5">
                <p className="text-7xl font-black tracking-tighter text-red-600 sm:text-8xl">
                    404
                </p>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Page introuvable
                    </h1>

                    <p className="mx-auto max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-base">
                        Oups ! Le film que vous recherchez semble avoir disparu des écrans.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                >
                    <Clapperboard size={17} />
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
