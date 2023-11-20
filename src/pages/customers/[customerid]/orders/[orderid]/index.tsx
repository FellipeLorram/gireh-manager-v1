import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import CustomerInfo from "@/components/layout/customer-info";
import { useRouter } from "next/router";
import { OrderInfo } from "@/components/layout/order-info";
import { buttonVariants } from "@/components/ui/button";
import { RemoveOrderDialog } from "@/components/layout/remove-order-dialog";

export default function Page() {
	const { customerid, orderid } = useRouter().query;

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4 gap-4">
			<div className="w-full flex flex-row">
			<Link href={`/customers/${customerid as string}`}>
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl font-bold text-center mx-auto">Nova Venda</h1>
			</div>
			<CustomerInfo id={customerid as string} />
			<OrderInfo id={orderid as string} />

			<div className="border rounded-md p-4 flex flex-wrap gap-4 w-full">
				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-full md:w-auto',
					})}
					href={`/orders/${orderid as string}/print`}
				>
					Imprimir
				</Link>

				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-full md:w-auto',
					})}
					href={`/orders/${orderid as string}/credit`}
				>
					Gerar Crediário
				</Link>

				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-full md:w-auto',
					})}
					href={`/orders/${orderid as string}/send-message`}
				>
					Enviar Mensagem
				</Link>

				<Link
					className={buttonVariants({
						className: 'w-full md:w-auto',
					})}
					href={`/customers/${customerid as string}/orders/${orderid as string}/edit`}
				>
					Editar
				</Link>
			</div>
			<div className="w-full p-4 rounded flex flex-row justify-end bg-red-500/5">
				<RemoveOrderDialog />
			</div>
		</div>
	)
}
