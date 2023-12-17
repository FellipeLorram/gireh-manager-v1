import { useForm } from "react-hook-form";
import { type OrgFormSchema, orgFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleDashed } from "lucide-react";

interface Props {
	className?: string;
	onSubmit: (data: OrgFormSchema) => void;
	isLoading?: boolean;
	defaultValues?: OrgFormSchema;
}

export function OrgForm({
	onSubmit,
	defaultValues,
	isLoading,
	className,
}: Props) {
	const form = useForm<OrgFormSchema>({
		resolver: zodResolver(orgFormSchema),
		defaultValues: defaultValues ?? {
			name: '',
			nickName: '',
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("w-full", className)}>
				<div className="p-4 w-full space-y-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Nome"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="nickName"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Nome via Laboratório</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Nome via Laboratório"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="w-full p-4 border-t flex flex-row items-center justify-end mt-6">
					<Button
						className="w-full md:w-auto"
						disabled={isLoading}
						type="submit"
					>

						{isLoading && (<CircleDashed className="animate-spin mr-2" />)}
						Salvar
					</Button>
				</div>

			</form>
		</Form>
	);
}