import { type UseFormReturn } from "react-hook-form";
import { type OrderFormFields } from "./form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function MeasuresDetails({ form }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Medidas
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mb-2 text-muted-foreground">
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
									<Input placeholder="32" type="number" {...field} />
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
									<Input placeholder="32" type="number" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
