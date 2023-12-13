import Link from "next/link"
import { Topbar } from "./topbar"
import { buttonVariants } from "../ui/button"

export function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		// <main className='w-full h-screen overflow-hidden flex flex-row items-start justify-start'>
		// 	<Navbar />
		// 	<NavbarMobile />
		<main className="w-full min-h-screen">
			<Topbar />
			<div className="mx-auto w-11/12 max-w-7xl pt-4 md:pt-8">
				<Link
					className={buttonVariants({ className: 'w-full mb-4 md:hidden' })}
					href="/customers/new">
					Novo Cliente
				</Link>
				{children}
			</div>
			<div className="h-20"></div>
		</main>
		// </main>
	)
}