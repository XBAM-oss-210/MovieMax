import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: "MovieMax",
        short_name: "MovieMax",
        description: "Films et séries à découvrir",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#090909",
        theme_color: "#090909",
        lang: "fr",
        categories: ["entertainment"],
        icons: [
            {
                src: "/icons/web-app-manifest-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/icons/web-app-manifest-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}