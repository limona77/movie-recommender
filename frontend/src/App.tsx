import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader2, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface Movie {
  title: string;
  poster: string | null;
  score: number;
}

function App() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleRecommend = async () => {
    if (!value.trim()) return;
    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const { data } = await axios.get(
        `/api/recommend/${encodeURIComponent(value)}?method=tfidf`,
      );
      console.log("ответ от сервера:", data);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Кнопка темы */}
      <div className="fixed top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          onClick={() => setDark(!dark)}
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>

      <div className="flex flex-col items-center gap-8 px-4 py-16">
        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-foreground">
          Рекомендации фильмов
        </h1>

        {/* Поиск */}
        <div className="flex gap-2 w-full max-w-md">
          <Input
            placeholder="Введите название фильма..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRecommend()}
          />
          <Button
            variant="default"
            className="hover:opacity-90 transition-opacity cursor-pointer"
            onClick={handleRecommend}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Найти похожие"
            )}
          </Button>
        </div>

        {/* Ошибка */}
        {error && <p className="text-destructive text-sm">{error}</p>}

        {/* Карточки */}
        {movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-4xl">
            {movies.map((movie) => (
              <Card key={movie.title} className="overflow-hidden">
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
                  <p className="text-xs text-muted-foreground">
                    Сходство: {(movie.score * 100).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

//  npm run dev -- --host 0.0.0.0
