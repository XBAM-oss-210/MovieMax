import Image from "next/image";
import { headers } from "next/headers";

// Un lien par type d'appareil
const BRAVE_LINKS = {
    android: "https://play.google.com/store/apps/details?id=com.brave.browser",
    ios: "https://apps.apple.com/app/brave-private-web-browser-vpn/id1052879175",
    desktop: "https://brave.com/download/",
} as const;

// Choisit le bon lien selon l'appareil du visiteur
const getBraveLink = (userAgent: string) => {
    if (/android/i.test(userAgent)) return BRAVE_LINKS.android;
    if (/iphone|ipad|ipod/i.test(userAgent)) return BRAVE_LINKS.ios;
    return BRAVE_LINKS.desktop;
};

const AdBlockTips = async () => {
    const userAgent = (await headers()).get("user-agent") ?? "";
    const href = getBraveLink(userAgent);

    return (
        <aside className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                    <Image
                        src="/logos/brave.svg"
                        alt="Logo Brave"
                        width={26}
                        height={26}
                        className="object-contain"
                    />
                </div>
                <p className="text-sm text-zinc-300">
                    Des pubs pendant la lecture ?{" "}
                    <span className="font-semibold text-white">Brave</span> les
                    bloque automatiquement.
                </p>
            </div>

            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-10 items-center rounded-md bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-500"
            >
                Télécharger Brave
            </a>
        </aside>
    );
};

export default AdBlockTips;