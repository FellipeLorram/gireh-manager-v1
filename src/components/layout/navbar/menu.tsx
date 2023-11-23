import {
  type LucideIcon,
  BarChart3,
  Users,
  Wallet,
  Stethoscope,
  CalendarSearch,
  Banknote
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinks = {
  href: string;
  name: string;
  Icon: LucideIcon;
}

const generalLinks: NavLinks[] = [
  { href: "/", name: "Dashboard", Icon: BarChart3 },
  { href: "/customers", name: "Clientes", Icon: Users },
  { href: "/orders", name: "Vendas", Icon: Wallet },
  { href: "/appointments", name: "Exames", Icon: Stethoscope },
]

const reportLinks: NavLinks[] = [
  { href: "/daily", name: "Dia", Icon: CalendarSearch },
  { href: "/payments", name: "Pagamentos", Icon: Banknote },
]

export function Menu() {
	const pathname = usePathname();

	return (
		<div>
			<div>NAME</div>
			<div>
				<h2 className="text-md text-muted-foreground mt-6">
					Geral
				</h2>
				<div className='mt-2 flex flex-col items-start gap-2 w-full'>
					{generalLinks.map(({ href, name, Icon }) => (
						<Link
							key={href}
							href={href}
							className={`w-full flex items-center justify-start p-2 rounded-md gap-2 group`}
						>
							<Icon
								className={`w-5 ${pathname === href ? "stroke-foreground" : "stroke-muted-foreground"} duration-200 ease-in-out group-hover:stroke-foreground`}
							/>
							<span className={`${pathname === href ? "text-foreground" : "text-muted-foreground"} text-md duration-200 ease-in-out group-hover:text-foreground`}>
								{name}
							</span>
						</Link>
					))}
				</div>
				<h2 className="text-md text-muted-foreground mt-6">
					Relatórios
				</h2>
				<div className='mt-2 flex flex-col items-start gap-2 w-full'>
					{reportLinks.map(({ href, name, Icon }) => (
						<Link
							key={href}
							href={href}
							className={`w-full flex items-center justify-start p-2 rounded-md gap-2 group`}
						>
							<Icon
								className={`w-5 ${pathname === href ? "stroke-foreground" : "stroke-muted-foreground"} duration-200 ease-in-out group-hover:stroke-foreground`}
							/>
							<span className={`${pathname === href ? "text-foreground" : "text-muted-foreground"} duration-200 ease-in-out group-hover:text-foreground`}>
								{name}
							</span>
						</Link>
					))}
				</div>
			</div>

		</div>
	)
}
