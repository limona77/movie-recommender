import { Button } from "@/shared/ui/button";
import { Moon, Sun } from "lucide-react";
import { IThemeToggleProps } from "./types";

export function ThemeToggle({ dark, onToggle }: IThemeToggleProps) {
  return (
    <div className="fixed top-4 right-4">
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer"
        onClick={onToggle}
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>
    </div>
  );
}
