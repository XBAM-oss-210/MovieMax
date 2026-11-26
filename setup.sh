#!/usr/bin/env bash
set -e

# Place-toi à la racine de ton projet (adapte le chemin) :
# cd ~/movieMax

files=(
  # Pages
  "app/movies/page.tsx"
  "app/movies/[id]/page.tsx"
  "app/series/page.tsx"
  "app/series/[id]/page.tsx"
  "app/favorites/page.tsx"
  "app/privacy-policy/page.tsx"
  "app/legal-notice/page.tsx"
  "app/terms-of-use/page.tsx"
  "app/contact-us/page.tsx"
  "app/search/page.tsx"

  # API
  "app/api/feedback/route.ts"
  "app/api/contact/route.ts"

  # Fichiers spéciaux de l'app
  "app/loading.tsx"
  "app/error.tsx"
  "app/not-found.tsx"

  # Composants
  "components/Hero.tsx"
  "components/MediaCard.tsx"
  "components/FeedbackModal.tsx"
  "components/layout/Navbar.tsx"
  "components/layout/Footer.tsx"
  "components/ui/SearchBar.tsx"
  "components/ui/CategoriesSearch.tsx"

  # Lib, services, hooks, context, types
  "lib/utils.ts"
  "services/movie.service.ts"
  "hooks/useFetch.ts"
  "hooks/useLocalStorage.ts"
  "hooks/useDebounce.ts"
  "hooks/useIntersectionObserver.ts"
  "context/FavoritesContext.tsx"
  "types/type.ts"
)

for f in "${files[@]}"; do
  mkdir -p "$(dirname "$f")"
  touch "$f"
done

echo "Terminé : ${#files[@]} fichiers créés."
