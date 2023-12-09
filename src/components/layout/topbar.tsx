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

import { buttonVariants } from "../ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { signOut } from "next-auth/react";

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
					<DropdownMenuItem>Perfil</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href="/settings/orgs">
							Óticas
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>Time</DropdownMenuItem>
					<DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

		</div>
	)
}
