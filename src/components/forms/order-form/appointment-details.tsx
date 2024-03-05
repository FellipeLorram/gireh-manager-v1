import { type UseFormReturn } from "react-hook-form";
import { type OrderFormFields } from "./form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function AppointmentDetails({ form }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Exame
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="mt-2 text-muted-foreground">
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
