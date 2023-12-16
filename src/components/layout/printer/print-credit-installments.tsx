import {
	type Org,
	type Order,
	type Frame,
	type Lenses,
	type Payments,
} from "@prisma/client";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { type CreditFormValues, creditFormSchema, CreditForm } from "../../forms/credit-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

const paymentType = {
	debit_card: 'Cartão de Débito',
	credit_card: 'Cartão de Crédito',
	pix: 'Pix',
	money: 'Dinheiro',
}

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

	const form = useForm<CreditFormValues>({
		resolver: zodResolver(creditFormSchema),
		defaultValues: {
			include_already_payed_bills: false,
			payment_day: '1',
			installments: '1',
		}
	});

	return (
		<div className="w-full">
			<CreditForm
				form={form}
				rest={order.rest}
				onSubmit={() => print()}
			/>

			<div className="hidden">
				<CreditInstallments
					order={order}
					org={org}
					creditValues={form.watch()}
					ref={ref}
				/>
			</div>
		</div>
	)
}


export const CreditInstallments = forwardRef<HTMLDivElement, Props & {
	creditValues: CreditFormValues;
}>(({
	order,
	org,
	creditValues
}, ref) => {
	return (
		<div className="w-full" ref={ref}>
			{
				creditValues?.include_already_payed_bills
				&&
				<div className="text-gray-900 bg-white pb-2 border-b border-dashed mb-2">

					<div className="w-full py-4 px-4 pl-10 flex flex-row justify-between gap-4 bg-gradient-to-b from-gray-100 to-white">
						<p className="text-xl font-semibold">
							{org.name}
						</p>
						<div className="text-right ">
							<p className="text-xs font-medium">
								{order.createdAt.toLocaleDateString()}
							</p>
							<p className="text-xs font-medium">
								Ordem de serviço: {order.service_order}
							</p>
						</div>
					</div>
					<div className="pb-2 pr-4 pl-10 pt-0 bg-gradient-to-t from-gray-100 to-white text-sm">
						Pagamentos já realizados
					</div>
					{order?.Payments.map((payment) => (
						<div key={payment.id} className="pr-4 pl-10 py-1 flex flex-row w-full border-b  border-gray-100 justify-between gap-4">
							<p className="text-xs">{payment.createdAt.toLocaleDateString()}</p>
							<p className="text-xs">{paymentType[payment.type as keyof typeof paymentType]}</p>
							<p className="text-xs">{payment.amount.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}</p>
						</div>
					))}
				</div>

			}

			{Array.from({ length: Number(creditValues?.installments) ?? 0 }).map((_, index) => (

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
						<p className="text-sm font-semibold">Vencimento: {`${creditValues?.payment_day}/____ /____`}</p>
						<p className="text-xs font-semibold">Valor: {(order?.rest / Number(creditValues?.installments)).toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})}</p>
						<p className="text-xs font-semibold">Parcela: {`${index + 1} de ${creditValues?.installments}`}</p>
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

