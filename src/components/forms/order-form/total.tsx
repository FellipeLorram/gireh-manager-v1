import { type UseFormReturn } from "react-hook-form";
import { type OrderFormFields } from "./form-schema";
import { useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function Total({ form }: Props) {
	const total = form.watch('total');
	const lenses = form.watch('lenses');
	const frames = form.watch('frame');
	const discount = form.watch('discount');

	useEffect(() => {
		const lensesTotal = lenses?.reduce((acc, curr) => acc + Number(curr.price), 0) ?? 0;
		const framesTotal = frames?.reduce((acc, curr) => acc + Number(curr.price), 0) ?? 0;
		if (discount && Number(discount) < (lensesTotal + framesTotal)) {
			form.setValue('total', (lensesTotal + framesTotal) - Number(discount));
			return;
		}
		form.setValue('total', (lensesTotal + framesTotal));
	}, [form, frames, lenses, discount]);

	const formatedTotal = total?.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}) ?? 'R$ 0,00';

	return (
		<div className="w-full">
			<Card>
				<CardHeader className='flex-row justify-between items-center'>
					<CardTitle>
						Desconto
					</CardTitle>
				</CardHeader>

				<CardContent>
					<FormField
						disabled={total === 0}
						rules={{
							max: total - 1,
						}}
						control={form.control}
						name="discount"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Valor do desconto</FormLabel>
								<FormControl>
									<Input
										placeholder="0"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			<div className={`w-full bg-card p-4 border rounded mt-4 flex justify-between items-center ${form.formState.errors.total?.message && 'border-red-500'}`}>
				<CardTitle>
					Total
				</CardTitle>
				<p className="text-xl">{formatedTotal}</p>
			</div>
		</div>
	)
}
