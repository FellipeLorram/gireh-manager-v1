import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const customerFormSchema = z.object({
	name: z.string().min(3, 'Nome inválido'),
	phone: z.string(),
	age: z.number(),
	address: z.string(),
	inLine: z.boolean(),
});

type CustomerFormSchema = z.infer<typeof customerFormSchema>;

interface Props {
	onSubmit: (data: CustomerFormSchema) => void;
	isLoading?: boolean;
	defaultValues?: CustomerFormSchema;
}

export function CustomerForm({ onSubmit, defaultValues, isLoading }: Props) {
	const form = useForm<CustomerFormSchema>({
		resolver: zodResolver(customerFormSchema),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
			</form>
		</Form>
	)
}

