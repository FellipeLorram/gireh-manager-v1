import Link from "next/link";
import { ThemeSwitcher } from "../theme-switcher";
import { SelectOrg } from "./select-org";
import { TopBarNavigation } from "./topbar-navigation";
import { buttonVariants } from "@/components/ui/button";
import { SettingsDropdown } from "./settings-dropdown";

export function Topbar() {
	return (
		<div className="w-full border-b pt-4">
			<div className="max-w-7xl mx-auto">
				<div className="w-full flex items-center justify-between px-2 md:px-0 mb-6">
					<div className="flex-1">
						<SelectOrg />
					</div>

					<Link
						className={buttonVariants({ className: 'hidden md:flex mr-4 items-center justify-center' })}
						href="/customers/new">
						Novo Cliente
					</Link>

					<ThemeSwitcher />
					<SettingsDropdown />
				</div>

				<TopBarNavigation />
			</div>

		</div>
	)
}
