import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SettingsDropdown() {
	const { data } = useSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="rounded-full w-10 h-10 flex items-center justify-center border cursor-pointer duration-200 hover:bg-muted-foreground/10">
					<UserCircle className="w-5 h-5 stroke-foreground" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="p-2">
					{data?.user.email}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer" asChild>
					<Link href="/settings">
						Perfil
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer" asChild>
					<Link href="/settings/orgs">
						Óticas
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer" asChild>
					<Link href="/settings/team">
						Time
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">Sair</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
