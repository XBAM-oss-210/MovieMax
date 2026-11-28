
"use client";

import { useEffect, useState } from "react";
import { MOVIE_GENRES } from "@/services/tmdb";
import Link from "next/link";
import {
  Menu,
  X,
  Film,
  Clapperboard,
  Heart,
  Search,
  ChevronDown,
  ChevronRight,
  Popcorn,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";



const mainLinks = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    name: "Films",
    href: "/movies",
    icon: Film,
  },
  {
    name: "Séries",
    href: "/series",
    icon: Clapperboard,
  },
  {
    name: "Favoris",
    href: "/favorites",
    icon: Heart,
  },
];


function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 transition-all focus-within:border-red-500/50 focus-within:bg-white/6"
    >
      <Search size={19} className="shrink-0 text-gray-500" />

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher un film, une série..."
        aria-label="Rechercher un film ou une série"
        maxLength={100}
        className="min-w-0 flex-1 bg-transparent py-1 text-sm text-white outline-none placeholder:text-gray-600"
      />

      <button
        type="submit"
        disabled={!query.trim()}
        aria-label="Lancer la recherche"
        className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
      >
        <Search size={15} />
        <span className="hidden sm:inline">Rechercher</span>
      </button>
    </form>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(true);

  // Fermer le menu avec la touche Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Empêcher le scroll lorsque le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);


  const SidebarContent = () => (
    <div className="flex h-full min-h-0 flex-col">

      {/* Navigation scrollable */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

        <nav className="space-y-2">

          {/* Navigation principale */}
          {mainLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-500"
              >
                <Icon
                  size={20}
                  className="transition-transform duration-200 group-hover:scale-110"
                />

                {item.name}
              </Link>
            );
          })}

          {/* Genres */}
          <div className="pt-5">

            <button
              onClick={() => setGenresOpen(!genresOpen)}
              aria-expanded={genresOpen}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-300 transition-colors hover:text-white"
            >
              <span className="flex items-center gap-4">
                <Popcorn size={20} />
                Genres
              </span>

              <ChevronDown
                size={17}
                className={`transition-transform duration-300 ${
                  genresOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                genresOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="ml-6 mt-2 space-y-1 border-l border-white/10 pl-4">

                {MOVIE_GENRES.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/genres/${genre.slug}`}
                    onClick={closeMenu}
                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-500 transition-all duration-200 hover:bg-red-500/10 hover:text-red-500"
                  >
                    {genre.name}

                    <ChevronRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </Link>
                ))}

                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Footer fixe en bas */}
      <div className="shrink-0 border-t border-white/10 bg-[#090909] px-5 py-5">
        <p className="px-4 text-xs text-gray-600">
          © 2026 MovieMax
        </p>

        <p className="px-4 pt-1 text-xs text-gray-700">
          Your cinema experience
        </p>
      </div>

    </div>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-[#090909]/95 px-5 backdrop-blur-xl md:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <img
            src="/textLogo.png"
            alt="MovieMax"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Search desktop */}
        <div className="mx-4 hidden w-full max-w-xl sm:block">
          <SearchBar />
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={isOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white transition-all hover:border-red-500/50 hover:bg-red-500/10 md:hidden"
        >
          <Menu size={24} />
        </button>

      </header>


      {/* Search mobile */}
      <div className="fixed inset-x-0 top-20 z-30 border-b border-white/5 bg-[#090909] px-5 py-3 sm:hidden">
        <SearchBar />
      </div>


      {/* DESKTOP SIDEBAR */}
      <aside className="fixed bottom-0 left-0 top-20 z-30 hidden w-64 border-r border-white/5 bg-[#090909] md:block">
        <SidebarContent />
      </aside>

      {/* MOBILE OVERLAY */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* MOBILE DRAWER - SLIDE RIGHT TO LEFT */}
      <aside
        className={`fixed bottom-0 right-0 top-0 z-60 w-[80%] max-w-sm border-l border-white/10 bg-[#0b0b0b] shadow-2xl shadow-black/50 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
  

        {/* Drawer header */}
        <div className="flex h-20 items-center justify-between border-b border-white/5 px-5">

          <Link href="/" onClick={closeMenu}>
            <img
              src="/textLogo.png"
              alt="MovieMax"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <button
            onClick={closeMenu}
            aria-label="Fermer le menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
          >
            <X size={22} />
          </button>

        </div>

        <SidebarContent />

      </aside>
    </>
  );
}

