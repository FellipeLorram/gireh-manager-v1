import {
	type Org,
	type Order,
	type Frame,
	type Lenses,
	type Payments,
} from "@prisma/client";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";

type OrderWithItems = Order & {
	Frame: Frame[];
	Lenses: Lenses[];
	Payments: Payments[];
}

interface Props {
	order: OrderWithItems;
	org: Org;
}


export function PrintCreditInstallments({ order, org }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const print = useReactToPrint({
		content: () => ref.current,
	});

	return (
		<div className="w-full">
			<Button
				className="w-full md:w-auto"
				onClick={print}>
				Imprimir
			</Button>

			<div className="hidden">
				<CreditInstallments
					order={order}
					org={org}
					ref={ref}
				/>
			</div>
		</div>
	)
}


export const CreditInstallments = forwardRef<HTMLDivElement, Props>(({
	order,
	org,
}, ref) => {
	return (
		<div className="w-full" ref={ref}>
			{Array.from({ length: Number(order?.credit_installments) ?? 0 }).map((_, index) => (

				<div
					key={index}
					className={`w-full border border-dashed mb-2 bg-white text-gray-900 pb-4 ${[4, 8].includes(index) && 'mt-96'}`}
				>
					<div className="w-full py-4 pr-4 pl-10 flex flex-row justify-between gap-4 bg-gradient-to-b from-gray-100 to-white">
						<p className="text-xl font-semibold">
							{org.name}
						</p>
						<div className="text-right">
							<p className="text-xs font-medium">
								{order.createdAt.toLocaleDateString()}
							</p>
							<p className="text-xs font-medium">
								Ordem de serviço: {order.service_order}
							</p>
						</div>
					</div>

					<div className="w-full flex justify-between pl-10 flex-row items-center bg-gradient-to-t from-gray-100 to-white p-2 px-4">
						<p className="text-sm font-semibold">Vencimento: {`${order?.credit_payment_days}/____ /____`}</p>
						<p className="text-xs font-semibold">Valor: {(order?.rest / Number(order?.credit_installments)).toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})}</p>
						<p className="text-xs font-semibold">Parcela: {`${index + 1} de ${order?.credit_installments}`}</p>
					</div>

					<div className="w-full mt-2 p-4 pl-10">

						<div className="w-full py-1 px-2 border-b border-gray-300">
							<p className="text-md">
								Valor Pago:
							</p>
						</div>
						<div className="w-full py-1 px-2 border-b border-gray-300">
							<p className="text-md">
								Resta:
							</p>
						</div>
						<div className="w-full py-1 px-2 border-b border-gray-300">
							<p className="text-md">
								Recebido por:
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
});

CreditInstallments.displayName = 'CreditInstallments';

