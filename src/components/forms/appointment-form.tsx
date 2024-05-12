import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleDashed } from "lucide-react";
import { cn } from "@/utils/cn";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const notEmptyValue = (value: string) => {
	const trimmedValue = String(value).trim();
	return trimmedValue !== '' && !/^[-+]?0(\.00)?$/.test(trimmedValue);
};

const AppointmentFormSchema = z.object({
	esf_right: z.string().regex(/^[+-]\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	cil_right: z.string().regex(/^[-]?\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	axle_right: z.string()
		.optional(),

	esf_left: z.string().regex(/^[+-]\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	cil_left: z.string().regex(/^[-]?\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	axle_left: z.string()
		.optional(),

	add: z.string().regex(/^[+]?\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	anamnesis: z.string().optional(),
	observations: z.string().optional(),
}).refine(data => {
	const filledFields = Object.values(data).filter(notEmptyValue);
	return filledFields.length > 0;
}, {
	message: "At least one field must be filled",
}).refine(({ cil_right, axle_right }) => !(cil_right && !axle_right),
	{ path: ['axle_right'], message: 'Cilindro OD requer eixo' })
	.refine(({ cil_left, axle_left }) => !(cil_left && !axle_left),
		{ path: ['axle_left'], message: 'Cilindro OE requer eixo' });

export type appointmentFormValues = z.infer<typeof AppointmentFormSchema>;

interface Props {
	className?: string;
	onSubmit: (data: appointmentFormValues) => void;
	isLoading?: boolean;
	defaultValues?: appointmentFormValues;
}

export function AppointmentForm({
	onSubmit,
	defaultValues,
	isLoading,
	className,
}: Props) {
	const form = useForm<appointmentFormValues>({
		resolver: zodResolver(AppointmentFormSchema),
		defaultValues: defaultValues ?? {
			esf_right: '-0.00',
			cil_right: '-0.00',
			axle_right: '0',
			esf_left: '-0.00',
			cil_left: '-0.00',
			axle_left: '0',
			add: '+0.00',
			anamnesis: '',
			observations: '',
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4 w-full", className)}>
				<Card>
					<CardHeader>
						<CardTitle>
							Dados da Consulta
						</CardTitle>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="anamnesis"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-lg mt-4">Anamnese</FormLabel>
									<FormControl>
										<Input placeholder="anamnese" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<p className="mt-4 text-muted-foreground">
							Olho Direito
						</p>
						<div className="w-full flex flex-row gap-2 items-center justify-center mt-2">
							<FormField
								control={form.control}
								name="esf_right"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Esf</FormLabel>
										<FormControl>
											<Input placeholder="-0.00" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cil_right"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Cil</FormLabel>
										<FormControl>
											<Input placeholder="-0.00" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="axle_right"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Eixo</FormLabel>
										<FormControl>
											<Input placeholder="0" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<p className="mt-4 text-muted-foreground">
							Olho Esquerdo
						</p>
						<div className="w-full flex flex-row gap-2 items-center justify-center mt-2">
							<FormField
								control={form.control}
								name="esf_left"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Esf</FormLabel>
										<FormControl>
											<Input placeholder="-0.00" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cil_left"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Cil</FormLabel>
										<FormControl>
											<Input placeholder="-0.00" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="axle_left"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Eixo</FormLabel>
										<FormControl>
											<Input placeholder="0" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<p className="mt-4 text-muted-foreground">
							Perto
						</p>
						<FormField
							control={form.control}
							name="add"
							render={({ field }) => (
								<FormItem className="w-full mt-2">
									<FormLabel>Adição</FormLabel>
									<FormControl>
										<Input placeholder="+0.00" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<div className="w-full p-4 border rounded">
					<FormField
						control={form.control}
						name="observations"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Observações</FormLabel>
								<FormControl>
									<Textarea className="resize-none" placeholder="observações" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{Object.keys(form.formState.errors).length > 0 && (
					<div className="w-full border rounded p-4 border-red-950 bg-red-800/10">
						<p>
							Consulta vazia
						</p>
					</div>
				)}

				<Button
					className="w-full md:w-auto"
					disabled={isLoading}
					type="submit">
					{isLoading ? <CircleDashed className="animate-spin" /> : (<>
						{defaultValues ? 'Salvar Alterações' : 'Salvar'}
					</>)}
				</Button>
			</form>
		</Form>
	)
}
