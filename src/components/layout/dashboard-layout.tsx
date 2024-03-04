import { cn } from "@/lib/utils"
import { Topbar } from "./topbar"

export function DashboardLayout(props: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<main className="w-full min-h-screen">
			<Topbar />
			<div className={cn("mx-auto w-11/12 max-w-7xl pt-4", props.className)}>
				{props.children}
			</div>
			<div className="h-20"></div>
		</main>
	)
}