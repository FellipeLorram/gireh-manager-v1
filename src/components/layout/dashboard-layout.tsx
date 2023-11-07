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
			<div className="w-full flex items-center justify-start flex-col flex-1 p-4 md:px-10">
				<Topbar />
				{children}
			</div>
		</main>
	)
}