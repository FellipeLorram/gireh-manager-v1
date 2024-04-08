import { useRouter } from "next/router";
import { PaymentForm, type PaymentFormValues } from "@/components/forms/payment-form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { CentralizedLayout } from "@/components/layout/centralized-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
	const { toast } = useToast();
	const { push, query } = useRouter();
	const { data } = api.order.get.useQuery({
		id: query.orderid as string,
	}, {
		enabled: !!query.orderid,
	});
	const { mutate, isLoading } = api.payment.create.useMutation({
		onSuccess: async () => {
			toast({
				title: "Pagamento registrado",
				description: "O pagamento foi registrado com sucesso",
			})

			await push(`/orders/${data?.id}`)
		},
		onError: (error) => {
			toast({
				title: "Erro ao registrar pagamento",
				description: error.message,
			})
		}
	});

	const onSubmit = (data: PaymentFormValues) => {
		mutate({
			amount: Number(data.amount),
			type: data.type,
			installments: Number(data.installments),
			orderId: query.orderid as string,
		})
	}

	return (
		<CentralizedLayout>
			<div className="w-full bg-card flex justify-between flex-row p-4 border rounded">
				<p>
					Total
				</p>
				<p>
					{data?.total.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}
				</p>
			</div>
			<div className="w-full bg-card flex justify-between flex-row p-4 border rounded mt-4 mb-8">
				<p>
					Valor faltante
				</p>
				<p>
					{data?.rest.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})}
				</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Cadastrar Pagamento</CardTitle>
				</CardHeader>
				<CardContent>
					<PaymentForm
						onSubmit={onSubmit}
						isLoading={isLoading}
					/>
				</CardContent>
			</Card>
		</CentralizedLayout>
	)
}
