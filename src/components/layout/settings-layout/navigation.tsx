import Link from "next/link"
import { usePathname } from "next/navigation"

const Links = [
	{ href: '/settings', label: 'Geral' },
	{ href: '/settings/orgs', label: 'Óticas' },
	{ href: '/settings/team', label: 'Time' },
]

export function SettingsNavigation() {
	const pathname = usePathname();

	return (
		<div className='md:flex flex-col gap-6 hidden w-52 mt-2'>
			{Links.map(({ href, label }) => (
				<Link
					key={`${href}${label}`}
					href={href}
					className={`text-sm hover:text-foreground duration-200 ease-in-out ${pathname === href ? 'text-foreground font-medium text-base' : 'text-muted-foreground'}`}
				>
					{label}
				</Link>
			))}
		</div>
	)
}
