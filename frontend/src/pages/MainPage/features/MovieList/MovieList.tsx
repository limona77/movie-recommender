import { MovieCard } from "./MovieCard";
import { IMovieListProps } from "./types";

export function MovieList({ movies }: IMovieListProps) {
  if (!movies.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-4xl">
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
}
