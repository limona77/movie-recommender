import {
  ErrorMessage,
  Header,
  MovieList,
  MovieSearch,
  ThemeToggle,
} from "./features";
import { useFetchMovies, useTheme } from "./hooks";

import { MovieCardSkeleton } from "./skeletons/MovieCardSkeleton";

export function MainPage() {
  const { dark, toggleTheme } = useTheme();

  const { value, setValue, movies, loading, error, handleRecommend } =
    useFetchMovies();

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle dark={dark} onToggle={toggleTheme} />

      <div className="flex flex-col items-center gap-8 px-4 py-16">
        <Header title="Рекомендации фильмов" />

        <MovieSearch
          value={value}
          loading={loading}
          onChange={setValue}
          onSearch={handleRecommend}
        />

        <ErrorMessage message={error} />

        {loading && <MovieCardSkeleton />}

        {!loading && <MovieList movies={movies} />}
      </div>
    </div>
  );
}
