import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

export function SelectOrg() {
	const { update } = useSession();
	const { data: org } = api.org.get.useQuery(undefined, {
		onSuccess: (data) => {
			setValue(data.name)
		},
	});
	const { data: orgs } = api.org.listUserOrgs.useQuery();
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState(org?.name)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
					size="sm"
				>
					{value ?? "Selecione a ótica..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Selecione a ótica..." />
					<CommandEmpty>Nenhuma ótica encontrada.</CommandEmpty>
					<CommandGroup>
						{orgs?.map((_org) => (
							<CommandItem
								key={_org.id}
								value={_org.name}
								onSelect={async (currentValue) => {
									setOpen(false)
									
									if(_org.id === org?.id) return
									
									setValue(currentValue);
									
									await update({ orgId: _org.id });
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										org?.id === _org.id ? "opacity-100" : "opacity-0"
									)}
								/>
								{_org.name}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
