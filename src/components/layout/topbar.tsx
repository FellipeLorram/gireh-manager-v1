import { Bell, UserCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeSwitcher } from "./theme-switcher";

export function Topbar() {
	return (
		<div className="w-full flex items-center justify-between">
			<div className="flex-1">
				<Link
					className={buttonVariants()}
					href="/customers/new">
					Novo Cliente
				</Link>
			</div>

			<div className="hidden md:block">
				<ThemeSwitcher />
			</div>
			<div className="rounded-full w-10 h-10 flex items-center justify-center border cursor-pointer duration-200 hover:bg-muted-foreground/10 mx-2">
				<Bell className="w-5 h-5 stroke-foreground" />
			</div>
			<div className="rounded-full w-10 h-10 flex items-center justify-center border cursor-pointer duration-200 hover:bg-muted-foreground/10">
				<UserCircle className="w-5 h-5 stroke-foreground" />
			</div>
		</div>
	)
}
