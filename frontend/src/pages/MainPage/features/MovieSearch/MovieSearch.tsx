import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Loader2 } from "lucide-react";
import { IMovieSearchProps } from "./types";

export function MovieSearch({
  value,
  loading,
  onChange,
  onSearch,
}: IMovieSearchProps) {
  return (
    <div className="flex gap-2 w-full max-w-md">
      <Input
        placeholder="Введите название фильма..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <Button
        variant="default"
        className="hover:opacity-90 transition-opacity cursor-pointer"
        onClick={onSearch}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Найти похожие"
        )}
      </Button>
    </div>
  );
}
