import { z } from "zod";
import { type UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleDashed, Minus, Plus } from "lucide-react";
import { useCallback } from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

const customerFormSchema = z.object({
	name: z.string().min(3, 'Nome inválido'),
	phone: z.array(z.object({
		number: z.string().min(1).transform((value) => value.match(/\d+/g)?.join('') ?? ''),
		id: z.string().optional(),
	})),
	birthDate: z.string().optional(),
	address: z.string().optional(),
	inLine: z.boolean().optional(),
});

export type CustomerFormSchema = z.infer<typeof customerFormSchema>;

interface Props {
	className?: string;
	onSubmit: (data: CustomerFormSchema) => void;
	isLoading?: boolean;
	defaultValues?: CustomerFormSchema;
}

export function CustomerForm({
	onSubmit,
	defaultValues,
	isLoading,
	className,
}: Props) {
	const form = useForm<CustomerFormSchema>({
		resolver: zodResolver(customerFormSchema),
		defaultValues: defaultValues ?? {
			name: '',
			phone: [{
				number: '',
			}],
			address: '',
			inLine: false,
			birthDate: new Date().toISOString().slice(0, 10),
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6 w-full", className)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Nome</FormLabel>
							<FormControl>
								<Input placeholder="nome" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="birthDate"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Data de Nascimento</FormLabel>
							<FormControl>
								<Input
									type="date"
									placeholder="age"
									{...field}
									value={
										typeof field.value === 'string'
											? field.value
											: new Date().toISOString().slice(0, 10)
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Age birthDate={form.watch('birthDate')} />

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Endereço</FormLabel>
							<FormControl>
								<Input placeholder="endereço" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<PhoneFields form={form} />

				<FormField
					control={form.control}
					name="inLine"
					render={({ field }) => (
						<FormItem className="flex flex-row-reverse w-full items-center justify-end gap-2 space-y-0">
							<FormLabel className="text-lg cursor-pointer">Fila de Exame</FormLabel>
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
					className="w-full md:w-auto"
					disabled={isLoading}
					type="submit">
					{isLoading ? <CircleDashed className="animate-spin" /> : (<>
						{defaultValues ? 'Atualizar' : 'Cadastrar'}
					</>)}
				</Button>
			</form>
		</Form>
	)
}

type AgeProps = {
	birthDate: string | undefined;
}

function Age({ birthDate }: AgeProps) {
	const age = birthDate ? new Date().getFullYear() - new Date(birthDate).getFullYear() : 0;

	return (
		<FormItem className="w-full">
			<FormLabel className="text-lg">Idade</FormLabel>
			<FormControl>
				<Input
					type="number"
					placeholder="age"
					value={age}
					readOnly
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	)
}

type PhoneFieldsProps = {
	form: UseFormReturn<CustomerFormSchema>;
}

function PhoneFields({ form }: PhoneFieldsProps) {
	const phones = form.watch('phone');
	const phonesSliced = phones?.slice(1);

	const addPhoneField = useCallback(() => {
		form.setValue('phone', [...phones, {
			number: '',
		}]);
	}, [form, phones]);

	const removePhoneField = useCallback((index: number) => {
		form.setValue('phone', phones?.filter((_, i) => i !== index));
	}, [form, phones]);

	return (
		<>
			<FormField
				control={form.control}
				name={`phone.${0}.number`}
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel className="text-lg">Telefone</FormLabel>
						<FormControl>
							<div className="w-full flex flex-row items-center justify-center gap-2">
								<Input mask="(99) 99999-9999" placeholder="telefone" {...field} />
								<Plus
									className='cursor-pointer stroke-muted-foreground hover:stroke-foreground duration-200 ease-in-out w-10'
									onClick={() => addPhoneField()}
								/>
							</div>
						</FormControl>

						<FormMessage />
					</FormItem>
				)}
			/>

			{phonesSliced?.map((_, index) => (

				<FormField
					key={index}
					control={form.control}
					name={`phone.${index + 1}.number`}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Telefone {index + 2}</FormLabel>
							<FormControl>
								<div className="w-full flex flex-row items-center justify-center gap-2">
									<Input mask="(99) 99999-9999" placeholder="telefone" {...field} />
									<Minus
										className='cursor-pointer stroke-muted-foreground hover:stroke-foreground duration-200 ease-in-out w-10'
										onClick={() => removePhoneField(index + 1)}
									/>
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			))}
		</>
	)
}
