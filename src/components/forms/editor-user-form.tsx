import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { ChangeUserPasswordDialog, type NewPasswordFormValues } from "../layout/settings-layout/change-user-password-dialog";
import { useState } from "react";

const userFormSchema = z.object({
	name: z.string().min(1, { message: 'Nome inválido' }),
	role: z.enum([
		"ADMIN",
		"USER"
	]),
	email: z.string().email({ message: 'Email inválido' }),
	orgs: z.array(z.string()).min(1, { message: 'Selecione pelo menos uma ótica' }),
	newPassword: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

interface Props {
	onSubmit: (data: UserFormValues) => void;
	defaultValues?: UserFormValues;
	isLoading?: boolean;
	allOrgs: {
		id: string;
		name: string;
	}[];
}

export function EditUserForm({
	onSubmit,
	defaultValues,
	isLoading,
	allOrgs,
}: Props) {
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm<UserFormValues>({
		resolver: zodResolver(userFormSchema),
		defaultValues: defaultValues ?? {
			name: '',
			role: 'USER',
		}
	});

	function changePasswordOnSubmit(data: NewPasswordFormValues) {
		form.setValue('newPassword', data.password);
	}

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
					<div className="p-4 border rounded space-y-4">
						<FormItem>
							<FormLabel>Nova Senha</FormLabel>
							<FormControl>
								<FormField
									disabled
									control={form.control}
									name="newPassword"
									render={({ field }) => (
										<div className="flex flex-row ">
											<Input
												className="flex-1 rounded-r-none"
												placeholder="Nova Senha"
												type={showPassword ? "text" : "password"}
												{...field}
											/>
											<Button
												onClick={() => setShowPassword(!showPassword)}
												type="button"
												variant="outline"
												className="rounded-l-none"
											>
												{showPassword ? <EyeOff className="w-4 stroke-muted-foreground" /> : <Eye className="w-4" />}
											</Button>
										</div>
									)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>

						<ChangeUserPasswordDialog
							onSubmit={changePasswordOnSubmit}
							isLoading={isLoading}
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
