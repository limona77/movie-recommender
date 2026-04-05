import { IMovieResponse } from "../../types";

export interface IMovieCardProps {
  movie: IMovieResponse;
}
export interface IMovieListProps {
  movies: IMovieCardProps["movie"][];
}
