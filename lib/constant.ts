type Server = {
    name: string;
    movieUrl: string;
    tvUrl: string;
};

export const SERVERS: Server[] = [
    {
        name: "Serveur 1",
        movieUrl: "https://fluxora.sbs/embed/zenix?tmdb={id}&type=movie&lang=vf",
        tvUrl: "https://fluxora.sbs/embed/zenix?tmdb={id}&type=tv&season={season}&episode={episode}&lang=vf",
    },
    {
        name: "Serveur 2",
        movieUrl: "https://cinesrc.st/embed/movie/{id}",
        tvUrl: "https://cinesrc.st/embed/tv/{id}?s={season}&e={episode}",
    },
    {
        name: "Serveur 3",
        movieUrl: "https://vidsrc.to/embed/movie/{id}",
        tvUrl: "https://vidsrc.to/embed/tv/{id}/{season}/{episode}",
    },
    {
        name: "Serveur 4",
        movieUrl: "https://vidzy.org/movie/{id}",
        tvUrl: "https://vidzy.org/serie/{id}/{season}/{episode}/vf",
    },
];