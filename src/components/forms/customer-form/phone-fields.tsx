import { type UseFormReturn } from "react-hook-form";
import { type CustomerFormSchema } from "./schema";
import { useCallback } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
	form: UseFormReturn<CustomerFormSchema>;
}

export function PhoneFields({ form }: Props) {
	const phones = form.watch('phone');
	const phonesSliced = phones?.slice(1);

	const addPhoneField = useCallback(() => {
		form.setValue('phone', [...(phones ?? []), {
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
