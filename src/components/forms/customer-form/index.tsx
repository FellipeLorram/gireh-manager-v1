import { customerFormSchema, type CustomerFormSchema } from "./schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AgeField } from "./age-field";
import { PhoneFields } from "./phone-fields";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CircleDashed } from "lucide-react";
import NameField from "./name-field";

interface Props {
	className?: string;
	onSubmit: (data: CustomerFormSchema) => void;
	isLoading?: boolean;
	defaultValues?: CustomerFormSchema;
	searchEnabled?: boolean;
}

export function CustomerForm({
	onSubmit,
	defaultValues,
	isLoading,
	className,
	searchEnabled,
}: Props) {
	const form = useForm<CustomerFormSchema>({
		resolver: zodResolver(customerFormSchema),
		defaultValues: defaultValues ?? {
			name: '',
			phone: [{
				number: '219',
			}],
			address: '',
			inLine: false,
			birthDate: new Date().toISOString().slice(0, 10),
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6 w-full", className)}>
				<NameField
					searchEnabled={searchEnabled}
					form={form}
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

				<AgeField birthDate={form.watch('birthDate')} />

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
					{isLoading && <CircleDashed className="animate-spin mr-2" />}
					{defaultValues ? 'Atualizar' : 'Cadastrar'}
				</Button>
			</form>
		</Form>
	)
}