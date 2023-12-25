import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import CustomerInfo from "@/components/layout/customer-info";
import { useRouter } from "next/router";
import { OrderInfo } from "@/components/layout/order-info";
import { buttonVariants } from "@/components/ui/button";
import { RemoveOrderDialog } from "@/components/layout/remove-order-dialog";
import { api } from "@/utils/api";
import { OrderTracking } from "@/components/layout/order-tracking";

export default function Page() {
	const { orderid } = useRouter().query;
	const { data } = api.order.get.useQuery({
		id: orderid as string,
	}, {
		enabled: !!orderid,
		refetchOnWindowFocus: true,
	});

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4 gap-4">
			<div className="w-full flex flex-row">
				<Link href={`/customers/${data?.customerId}`}>
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl font-bold text-center mx-auto">OS: {data?.service_order}</h1>
			</div>
			<CustomerInfo id={data?.customerId} />

			<OrderInfo order={data} />

			<OrderTracking id={orderid as string} />

			<div className="border rounded p-4 flex flex-wrap gap-4 w-full">
				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-full md:w-auto',
					})}
					href={`/orders/${orderid as string}/print`}
				>
					Imprimir Venda
				</Link>

				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-full md:w-auto',
					})}
					href={`/customers/${data?.customerId}/send-message?message=Oi%2C+boa+tarde%21+Seus+%C3%B3culos+ficaram+prontos%2C+j%C3%A1+pode+vir+buscar.+Funcionamos+at%C3%A9+as+20%3A00h.`}
				>
					Enviar Mensagem
				</Link>

				<Link
					className={buttonVariants({
						className: 'w-full md:w-auto',
					})}
					href={`/orders/${orderid as string}/edit`}
				>
					Editar
				</Link>
			</div>
			<div className="w-full p-4 rounded flex flex-row justify-end bg-red-100/10 dark:bg-red-900/10 border dark:border-red-950 border-red-200">
				<RemoveOrderDialog />
			</div>
		</div>
	)
}
