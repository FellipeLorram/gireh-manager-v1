import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useRange } from "./atoms"

export function DatePickerWithRange({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const { range, setCustom } = useRange()

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						size="sm"
						id="date"
						variant={range.label === 'Custom' ? 'secondary' : 'outline'}
						className={cn(
							"justify-start text-left font-normal",
							!range && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{range?.start ? (
							range.end ? (
								<>
									{format(range.start, "LLL dd, y")} -{" "}
									{format(range.end, "LLL dd, y")}
								</>
							) : (
								format(range.start, "LLL dd, y")
							)
						) : (
							<span>Escolha a Data</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={range?.start}
						selected={{
							from: range?.start,
							to: range?.end,
						}}
						onSelect={(range) => {
							if (!range?.from) return
							setCustom({
								start: range?.from,
								end: range?.to ?? addDays(range.from, 1),
							})
						}}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
