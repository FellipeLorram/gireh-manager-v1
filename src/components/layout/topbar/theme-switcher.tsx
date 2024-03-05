import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Wrap Lucide components with dynamic to load them only on the client side
const DynamicSun = dynamic(() => import('lucide-react').then((module) => module.Sun), { ssr: false });
const DynamicMoon = dynamic(() => import('lucide-react').then((module) => module.Moon), { ssr: false });

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-10 h-10 flex items-center justify-center border cursor-pointer duration-200 hover:bg-muted-foreground/10 mr-2"
    >
      {theme === 'dark' && <DynamicSun className="w-5 h-5 stroke-foreground" />}
      {theme === 'light' && <DynamicMoon className="w-5 h-5 stroke-foreground" />}
    </div>
  );
}
