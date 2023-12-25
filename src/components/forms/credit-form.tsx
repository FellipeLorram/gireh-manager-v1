import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";

export const creditFormSchema = z.object({
	include_already_payed_bills: z.boolean(),
	payment_day: z.enum(["1", "5", "10", "15", "20", "25"]),
	installments: z.string().min(1, { message: 'Parcelamento inválido' }),
});

export type CreditFormValues = z.infer<typeof creditFormSchema>;

interface Props {
	onSubmit: (data: CreditFormValues) => void;
	rest: number;
	isLoading?: boolean;
}

export function CreditForm({ onSubmit, rest, isLoading }: Props) {
	const form = useForm<CreditFormValues>({
		resolver: zodResolver(creditFormSchema),
		defaultValues: {
			include_already_payed_bills: false,
			payment_day: '1',
			installments: '1',
		}
	});

	const disabled = rest === 0 || isLoading;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
				<FormField
					control={form.control}
					name="payment_day"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dia do Vencimento</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="selecione o dia do vencimento" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1">Dia 1</SelectItem>
										<SelectItem value="5">Dia 5</SelectItem>
										<SelectItem value="10">Dia 10</SelectItem>
										<SelectItem value="15">Dia 15</SelectItem>
										<SelectItem value="20">Dia 20</SelectItem>
										<SelectItem value="25">Dia 25</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="installments"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Número de Parcelas</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="selecione a quantidade de parcelas" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1">1x de {Number(rest).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="2">2x de {(Number(rest) / 2).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="3">3x de {(Number(rest) / 3).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="4">4x de {(Number(rest) / 4).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="5">5x de {(Number(rest) / 5).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="6">6x de {(Number(rest) / 6).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="7">7x de {(Number(rest) / 7).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="8">8x de {(Number(rest) / 8).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="9">9x de {(Number(rest) / 9).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
										<SelectItem value="10">10x de {(Number(rest) / 10).toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="include_already_payed_bills"
					render={({ field }) => (
						<FormItem className="flex flex-row-reverse w-full items-center justify-end gap-2 space-y-0">
							<FormLabel className="cursor-pointer">Incluir Pagamentos já realizados</FormLabel>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={disabled}
					className="w-full md:w-auto">
					{isLoading && <CircleDashed className="w-5 h-5 mr-2 animate-spin" />}
					Gerar
				</Button>
			</form>
		</Form >
	);
}

