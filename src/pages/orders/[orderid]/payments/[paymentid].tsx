import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { PaymentForm, type PaymentFormValues } from "@/components/forms/payment-form";
import { CentralizedLayout } from "@/components/layout/centralized-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Page() {
	const { toast } = useToast();
	const { push, query } = useRouter();
	const { data } = api.order.get.useQuery({
		id: query.orderid as string,
	}, {
		enabled: !!query.orderid,
	});
	const { mutate, isLoading } = api.payment.update.useMutation({
		onSuccess: async () => {
			toast({
				title: "Pagamento atualizado",
				description: "O pagamento foi atualizado com sucesso",
			})

			await push(`/orders/${query.orderid as string}`)
		},
	});
	const { data: payment } = api.payment.get.useQuery({
		id: query.paymentid as string,
	}, {
		enabled: !!query.paymentid,
	});

	const onSubmit = (data: PaymentFormValues) => {
		mutate({
			amount: Number(data.amount),
			type: data.type,
			installments: Number(data.installments),
			id: query.paymentid as string,
		})
	}

	return (
		<CentralizedLayout>
			<div className="w-full flex justify-between flex-row p-4 border rounded">
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
			<div className="w-full flex justify-between flex-row p-4 border rounded my-4">
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
						defaultValues={{
							amount: payment?.amount.toString() ?? '',
							type: payment?.type as PaymentFormValues["type"],
							installments: payment?.installments.toString() ?? '',
						}}
					/>
				</CardContent>
			</Card>
		</CentralizedLayout>
	)
}
