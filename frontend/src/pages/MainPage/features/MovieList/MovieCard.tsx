import { Card, CardContent } from "@/shared/ui/card";
import { IMovieCardProps } from "./types";

export function MovieCard({ movie }: IMovieCardProps) {
  return (
    <Card className="overflow-hidden">
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-muted flex items-center justify-center">
          <p className="text-muted-foreground text-xs">Нет постера</p>
        </div>
      )}
      <CardContent className="p-3 flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground leading-tight">
          {movie.title}
        </p>
      </CardContent>
    </Card>
  );
}
