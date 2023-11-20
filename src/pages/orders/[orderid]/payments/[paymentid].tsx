import { PaymentForm, type PaymentFormValues } from "@/components/forms/payment-form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

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

			await push(`/customers/${data?.customerId}/orders/${data?.id}`)
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
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4">
			<div className="w-full flex flex-row">
				<Link href={`/customers/${data?.customerId}/orders/${data?.id}`}>
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl font-bold text-center mx-auto">OS: {data?.service_order}</h1>
			</div>
			<div className="w-full flex justify-between flex-row p-4 border rounded mt-8">
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
			<div className="w-full flex justify-between flex-row p-4 border rounded mt-4 mb-8">
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
			<PaymentForm
				onSubmit={onSubmit}
				isLoading={isLoading}
				defaultValues={{
					amount: payment?.amount.toString() ?? '',
					type: payment?.type as PaymentFormValues["type"],
					installments: payment?.installments.toString() ?? '',
				}}
			/>
		</div>
	)
}
