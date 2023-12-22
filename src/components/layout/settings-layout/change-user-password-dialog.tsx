import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CircleDashed } from "lucide-react";
import { useRef } from "react";

const NewPasswordFormSchema = z.object({
	password: z.string().min(6, { message: 'Senha inválida, mínimo de 6 caracteres' }),
	confirmPassword: z.string().min(6, { message: 'Senha inválida' }),
}).refine(data => data.password === data.confirmPassword, {
	message: 'As senhas não coincidem',
	path: ['confirmPassword'],
});

export type NewPasswordFormValues = z.infer<typeof NewPasswordFormSchema>;

interface Props {
	isLoading?: boolean;
	onSubmit: (data: NewPasswordFormValues) => void;
}

export function ChangeUserPasswordDialog({
	onSubmit,
	isLoading
}: Props) {
	const ref = useRef<HTMLButtonElement>(null);
	const form = useForm<NewPasswordFormValues>({
		resolver: zodResolver(NewPasswordFormSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		}
	});

	return (
		<div className="p-4 border rounded flex flex-col md:flex-row-reverse gap-2 items-center justify-between">
			<Dialog>
				<DialogTrigger asChild>
					<Button className="w-full md:w-auto" variant="secondary">
						Alterar Senha
					</Button>
				</DialogTrigger>
				<DialogContent className="p-0">
					<DialogClose ref={ref} className="absolute top-0 right-0 m-4" />
					<DialogHeader className="p-4 border-b">
						<DialogTitle>Alterar Senha</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<div className="space-y-6 w-full p-4">

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nova senha</FormLabel>
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
										<FormLabel>Confirme a nova senha</FormLabel>
										<FormControl>
											<Input type="password" placeholder="******" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

						</div>
						<div className="p-4 flex justify-end items-center border-t">
							<Button
								disabled={isLoading}
								className="w-full md:w-auto"
								type="button"
								onClick={async () => {
									await form.handleSubmit(onSubmit)();
									if (!form.formState.errors.confirmPassword) ref.current?.click();
								}}
							>
								{isLoading && <CircleDashed className="animate-spin mr-2" />}
								Alterar
							</Button>
						</div>
					</Form>
				</DialogContent>
			</Dialog>
			<FormDescription>
				A senha só será alterada após clicar em salvar
			</FormDescription>
		</div>
	)
}
