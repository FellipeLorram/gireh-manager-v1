import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { CustomerForm } from "@/components/forms/customer-form";
import { type CustomerFormSchema } from "@/components/forms/customer-form/schema";
import { useToast } from "@/components/ui/use-toast";
import { CentralizedLayout } from "@/components/layout/centralized-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Page() {
	const { toast } = useToast();
	const { push, query } = useRouter();
	const { data } = api.customer.get.useQuery({
		id: query.customerid as string,
	}, {
		enabled: !!query.customerid,
	});

	const { mutate, isLoading } = api.customer.create.useMutation({
		onSuccess: async ({ id }) => {
			toast({
				description: 'Cliente atualizado com sucesso',
			});
			await push(`/customers/${id}`);
		},
		onError: (error) => {
			toast({
				description: error.message,
			});
		}
	});


	const onSubmit = (data: CustomerFormSchema) => {
		mutate({
			...data,
			phone: data.phone?.map((phone) => ({
				...phone,
				number: phone.number,
			})),
		});
	}

	return (
		<CentralizedLayout>
			<Card>
				<CardHeader>
					<CardTitle>
						Atualizar Cliente
					</CardTitle>
				</CardHeader>
				<CardContent>
				<CustomerForm
					searchEnabled={false}
					className="my-auto"
					onSubmit={onSubmit}
					isLoading={isLoading}
					defaultValues={{
						birthDate: data?.birthDate?.toISOString().slice(0, 10) ?? '',
						name: data?.name ?? '',
						address: data?.address ?? '',
						phone: data?.Phone.map(phone => {
							return {
								id: phone.id,
								number: phone.number
							}
						}) ?? [{
							number: ''
						}],
					}}
				/>
				</CardContent>
			</Card>
		</CentralizedLayout>
		
	)
}
