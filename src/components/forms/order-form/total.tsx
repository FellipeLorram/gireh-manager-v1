import { type UseFormReturn } from "react-hook-form";
import { type OrderFormFields } from "./form-schema";
import { useEffect } from "react";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function Total({ form }: Props) {
	const total = form.watch('total');
	const lenses = form.watch('lenses');
	const frames = form.watch('frame');

	useEffect(() => {
		const lensesTotal = lenses?.reduce((acc, curr) => acc + Number(curr.price), 0) ?? 0;
		const framesTotal = frames?.reduce((acc, curr) => acc + Number(curr.price), 0) ?? 0;
		form.setValue('total', lensesTotal + framesTotal);
	}, [form, frames, lenses]);

	const formatedTotal = total?.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}) ?? 'R$ 0,00';

	return (
		<div className={`w-full p-4 border rounded mt-4 flex justify-between ${form.formState.errors.total?.message && 'border-red-500'}`}>
			<p className="text-lg">Total</p>
			<p className="text-xl">{formatedTotal}</p>
		</div>
	)
}
