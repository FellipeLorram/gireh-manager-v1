import { UserCircle } from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ThemeSwitcher } from "../theme-switcher";
import { signOut } from "next-auth/react";
import { SelectOrg } from "./select-org";
import { TopBarNavigation } from "./topbar-navigation";
import { buttonVariants } from "@/components/ui/button";

export function Topbar() {
	return (
		<div className="w-full border-b pt-4">
			<div className="max-w-7xl mx-auto">
				<div className="w-full flex items-center justify-between px-2 md:px-0 mb-6">
					<div className="flex-1">
						<SelectOrg />
					</div>

					<Link
						className={buttonVariants({ className: 'hidden md:block mr-4' })}
						href="/customers/new">
						Novo Cliente
					</Link>

					<ThemeSwitcher />
					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className="rounded-full w-10 h-10 flex items-center justify-center border cursor-pointer duration-200 hover:bg-muted-foreground/10">
								<UserCircle className="w-5 h-5 stroke-foreground" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{/* <DropdownMenuItem>Perfil</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/settings/orgs">
									Óticas
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>Time</DropdownMenuItem> */}
							<DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<TopBarNavigation />
			</div>

		</div>
	)
}
