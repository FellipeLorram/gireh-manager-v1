import { type UseFormReturn } from "react-hook-form"
import { type OrderFormFields } from "./form-schema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface Props {
	form: UseFormReturn<OrderFormFields>
}

export function OthersFields({ form }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Observações
				</CardTitle>
			</CardHeader>

			<CardContent>
				<FormField
					control={form.control}
					name="observation"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Observações</FormLabel>
							<FormControl>
								<Textarea className="resize-none" placeholder="observações" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	)
}
