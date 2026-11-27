import { getTrendingMovies } from "@/services/tmdb";
import HeroSlider from "@/components/HeroSlider";

const SLIDES_COUNT = 5;

const Hero = async () => {
    const { results } = await getTrendingMovies();

    const movies = results
        .filter((item) => item.backdrop_path)
        .slice(0, SLIDES_COUNT);

    if (movies.length === 0) return null;

    return <HeroSlider movies={movies} />;
};

export default Hero;