import { Menu } from "./menu";

export function Navbar() {
  return (
    <nav className="p-4 pl-8 pr-16 border-r h-full hidden md:block">
      <Menu />
    </nav>
  )
}
