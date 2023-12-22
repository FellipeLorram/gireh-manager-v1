import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CircleDashed } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect } from "react";

export const paymentFormSchema = z.object({
	amount: z.string().min(1, { message: 'Valor inválido' }),
	type: z.enum([
		"debit_card",
		"credit_card",
		"pix",
		"money"
	]),
	installments: z.string().min(1, { message: 'Parcelamento inválido' }),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface Props {
	onSubmit: (data: PaymentFormValues) => void;
	isLoading?: boolean;
	defaultValues?: PaymentFormValues;
}

export function PaymentForm({ onSubmit, isLoading, defaultValues }: Props) {
	const form = useForm<PaymentFormValues>({
		resolver: zodResolver(paymentFormSchema),
		defaultValues: defaultValues ?? {
			amount: '',
			type: 'credit_card',
			installments: '1',
		}
	});

	const amount = form.watch('amount');
	const type = form.watch('type');

	useEffect(() => {
		form.reset(defaultValues);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor</FormLabel>
							<FormControl>
								<Input placeholder="valor" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Método de Pagamento</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="selecione o método de pagamento" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="credit_card">Cartão de Crédito</SelectItem>
									<SelectItem value="debit_card">Cartão de Débito</SelectItem>
									<SelectItem value="pix">Pix</SelectItem>
									<SelectItem value="money">Dinheiro</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="installments"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Parcelas</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="selecione a quantidade de parcelas" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="1">1x de {Number(amount).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
									{type === 'credit_card' && (
										<>
											<SelectItem value="2">2x de {(Number(amount) / 2).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
											<SelectItem value="3">3x de {(Number(amount) / 3).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
											<SelectItem value="4">4x de {(Number(amount) / 4).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
											<SelectItem value="5">5x de {(Number(amount) / 5).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
											<SelectItem value="6">6x de {(Number(amount) / 6).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
											<SelectItem value="7">7x de {(Number(amount) / 7).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
											<SelectItem value="8">8x de {(Number(amount) / 8).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
											<SelectItem value="9">9x de {(Number(amount) / 9).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
											<SelectItem value="10">10x de {(Number(amount) / 10).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										</>
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="w-full md:w-auto"
					type="submit"
					disabled={isLoading}
				>
					{isLoading && <CircleDashed className="animate-spin mr-2" />}
					{defaultValues ? 'Salvar Alterações' : 'Adicionar Pagamento'}
				</Button>
			</form>
		</Form>
	)
}
