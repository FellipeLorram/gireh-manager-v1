import { type UseFormReturn } from "react-hook-form";
import { type CustomerFormSchema } from "./schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from '@/utils/api'
import Link from "next/link";

type Props = {
	form: UseFormReturn<CustomerFormSchema>;
}

export default function NameField({ form }: Props) {
	const name = form.watch('name');
	const { data } = api.customer.searchByName.useQuery({
		name,
	}, {
		enabled: !!name,
	});


	return (
		<div className="w-full relative">
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
			{data && data?.length > 0 && (
				<div className="absolute mt-2 left-0 w-full flex flex-col border-2 shadow-2xl rounded">
					{data?.map((customer) => (
						<Link
							href={`/customers/${customer.id}`}
							key={customer.id}
							className="w-full rounded-none border-0 border-b flex flex-col gap-2 p-2 px-4 bg-background text-sm first:rounded-t last:rounded-b hover:bg- duration-200"
						>
							<p>{customer.name}</p>
							<p className="text-xs">{customer.Phone[0]?.number}</p>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
