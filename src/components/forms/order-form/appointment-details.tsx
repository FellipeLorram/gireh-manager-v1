import { type UseFormReturn } from "react-hook-form";
import { type OrderFormFields } from "./form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useLastAppointmentData } from "@/hooks/use-last-appointment-data";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function AppointmentDetails({ form }: Props) {
	const { query } = useRouter();
	const customerId = query.customerid as string;
	const { isLoading, data } = useLastAppointmentData({ customerId });

	const handleUseLastAppointmentDataClick = () => {
		form.setValue('esf_right', data?.esf_right ?? '-0.00');
		form.setValue('cil_right', data?.cil_right ?? '-0.00');
		form.setValue('axle_right', data?.axle_right?.toString() ?? '0');
		form.setValue('esf_left', data?.esf_left ?? '-0.00');
		form.setValue('cil_left', data?.cil_left ?? '-0.00');
		form.setValue('axle_left', data?.axle_left?.toString() ?? '0');
		form.setValue('add', data?.add ?? '+0.00');
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Exame
				</CardTitle>
				{data && (
					<button
						onClick={handleUseLastAppointmentDataClick}
						className="w-fit border-b text-muted-foreground border-muted-foreground"
					>
						{isLoading ? ' ' : 'Usar dados do último exame'}
					</button>
				)}
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground">
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
						<FormItem className="w-full mt-1">
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
	)
}
