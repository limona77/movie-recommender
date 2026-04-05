export interface IMovieSearchProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSearch: () => void;
}
