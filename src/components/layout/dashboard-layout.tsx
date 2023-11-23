import { Navbar } from "./navbar/navbar"
import { NavbarMobile } from "./navbar/navbar-mobile"
import { Topbar } from "./topbar"

export function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className='w-full h-screen overflow-hidden flex flex-row items-start justify-start'>
			<Navbar />
			<NavbarMobile />
			<div className="w-full h-screen p-6 md:pb-8 md:px-10 overflow-y-auto">
				<Topbar />
				{children}
				<div className="h-20"></div>
			</div>
		</main>
	)
}