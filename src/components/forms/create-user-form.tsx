import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const CreateUserFormSchema = z.object({
	name: z.string().min(1, { message: 'Nome inválido' }),
	role: z.enum([
		"ADMIN",
		"USER"
	]),
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(1, { message: 'Senha inválida' }),
	confirmPassword: z.string().min(1, { message: 'Senha inválida' }),
	orgs: z.array(z.string()),
}).refine(data => data.password === data.confirmPassword, {
	message: 'As senhas não coincidem',
	path: ['confirmPassword'],
});

export type CreateUserFormValues = z.infer<typeof CreateUserFormSchema>;

interface Props {
	onSubmit: (data: CreateUserFormValues) => void;
	isLoading?: boolean;
	allOrgs: {
		id: string;
		name: string;
	}[];
}

export function CreateUserForm({
	onSubmit,
	isLoading,
	allOrgs,
}: Props) {
	const form = useForm<CreateUserFormValues>({
		resolver: zodResolver(CreateUserFormSchema),
		defaultValues: {
			name: '',
			role: 'USER',
			password: '',
			confirmPassword: '',
			orgs: [],
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="space-y-6 w-full p-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input placeholder="name" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input placeholder="email" type="email" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nível</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Nível" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="ADMIN">Admin</SelectItem>
										<SelectItem value="USER">Comum</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>


					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<Input placeholder="******" type="password" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirme a Senha</FormLabel>
								<FormControl>
									<Input type="password" placeholder="******" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="p-4 border rounded">
						<FormField
							control={form.control}
							name="orgs"
							render={() => (
								<FormItem>
									<div className="mb-4">
										<FormLabel className="text-base">Óticas</FormLabel>
										<FormDescription>
											Selecione as óticas que este usuário terá acesso
										</FormDescription>
									</div>
									{allOrgs.map((org) => (
										<FormField
											key={org.id}
											control={form.control}
											name="orgs"
											render={({ field }) => {
												return (
													<FormItem
														key={org.id}
														className="flex flex-row items-start space-x-3 space-y-0"
													>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(org.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([...field.value, org.id])
																		: field.onChange(
																			field.value?.filter(
																				(value) => value !== org.id
																			)
																		)
																}}
															/>
														</FormControl>
														<FormLabel className="font-normal">
															{org.name}
														</FormLabel>
													</FormItem>
												)
											}}
										/>
									))}
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

				</div>

				<div className="p-4 flex justify-end items-center border-t">
					<Button
						disabled={isLoading}
						className="w-full md:w-auto"
						type="submit"
					>
						{isLoading && <CircleDashed className="animate-spin mr-2" />}
						Salvar
					</Button>
				</div>

			</form>
		</Form>
	)
}
