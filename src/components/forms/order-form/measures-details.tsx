import { type UseFormReturn } from "react-hook-form";
import { type OrderFormFields } from "./form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function MeasuresDetails({ form }: Props) {
	return (

		<div className="w-full border rounded p-4 mt-4">
			<h2 className="text-lg text-foreground">
				Medidas
			</h2>

			<p className="my-2 text-muted-foreground">
				DNP
			</p>

			<div className="w-full flex flex-row justify-center items-center gap-2">
				<FormField
					control={form.control}
					name="dnp_right"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Olho Direito</FormLabel>
							<FormControl>
								<Input placeholder="32" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dnp_left"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Olho Esquerdo</FormLabel>
							<FormControl>
								<Input placeholder="32" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	)
}
