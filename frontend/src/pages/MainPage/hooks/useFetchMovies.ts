import axios from "axios";
import { useState } from "react";
import { RECOMMEND_METHOD } from "../constants";
import { IMovieResponse } from "../types";

export function useFetchMovies() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    if (!value.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const { data } = await axios.get(
        `/api/recommend/${encodeURIComponent(value)}?method=${RECOMMEND_METHOD}`,
      );

      if (data.error) {
        setError(data.error);
      } else {
        setMovies(data);
      }
    } catch {
      setError("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return {
    value,
    setValue,
    movies,
    loading,
    error,
    handleRecommend,
  };
}
