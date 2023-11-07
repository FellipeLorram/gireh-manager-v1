import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-10 h-10 flex items-center justify-center border cursor-pointer duration-200 hover:bg-muted-foreground/10 mr-2"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 stroke-foreground" />
      ) : (
        <Moon className="w-5 h-5 stroke-foreground" />
      )}
    </button>
  )
}
