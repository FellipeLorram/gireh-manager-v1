import { CustomerForm } from "@/components/forms/customer-form";
import { type CustomerFormSchema } from "@/components/forms/customer-form/schema";
import { CentralizedLayout } from "@/components/layout/centralized-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function Page() {
	const { toast } = useToast();
	const { push } = useRouter();
	const { mutate, isLoading } = api.customer.create.useMutation({
		onSuccess: async ({ inLine }) => {
			toast({
				description: 'Cliente cadastrado com sucesso',
			});
			if (inLine) await push('/appointments')
			else await push('/')
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
						Cadastrar Cliente
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CustomerForm
						searchEnabled
						className="my-auto"
						onSubmit={onSubmit}
						isLoading={isLoading}
					/>
				</CardContent>
			</Card>
		</CentralizedLayout>
	)
}
