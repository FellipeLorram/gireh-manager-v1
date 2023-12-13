import { useSession } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation";

const Links = [
  { href: "/", name: "Dashboard" },
  { href: "/customers", name: "Clientes" },
  { href: "/orders", name: "Vendas" },
  { href: "/appointments", name: "Exames" },
]
const reportLinks = [
  { href: "/daily", name: "Dia" },
  { href: "/payments", name: "Pagamentos" },
]
export function TopBarNavigation() {
  const pathname = usePathname();
  const { data } = useSession();

  const isAdmin = data?.user?.role === "ADMIN";

  return (
    <div className="w-full flex gap-4 md:gap-6 overflow-x-auto px-2 md:px-0 scrollbar-hide -mb-px">
      {Links.map(({ href, name }) => (
        <Link
          className={`text-sm pb-2 duration-200 ease-in-out group ${pathname === href && "border-b-2 border-foreground"}`}
          key={href}
          href={href}
        >
          <p className={`p-2 rounded group-hover:bg-secondary duration-200 ease-in-out ${pathname !== href && "text-muted-foreground group-hover:text-foreground"}`}>
            {name}
          </p>
        </Link>
      ))}
      {isAdmin && reportLinks.map(({ href, name }) => (
        <Link
          className={`text-sm pb-2 duration-200 ease-in-out group ${pathname === href && "border-b-2 border-foreground"}`}
          key={href}
          href={href}
        >
          <p className={`p-2 rounded group-hover:bg-secondary duration-200 ease-in-out ${pathname !== href && "text-muted-foreground group-hover:text-foreground"}`}>
            {name}
          </p>
        </Link>
      ))}
    </div>
  )
}
