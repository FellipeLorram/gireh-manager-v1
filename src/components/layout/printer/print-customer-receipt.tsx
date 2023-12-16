import {
	type Org,
	type Order,
	type Frame,
	type Lenses,
	type Payments,
} from "@prisma/client";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../ui/button";

type OrderWithItems = Order & {
	Frame: Frame[];
	Lenses: Lenses[];
	Payments: Payments[];
}

interface Props {
	order: OrderWithItems;
	org: Org;
}

const paymentType = {
	debit_card: 'Cartão de Débito',
	credit_card: 'Cartão de Crédito',
	pix: 'Pix',
	money: 'Dinheiro',
}

export function PrintCustomerReceipt({ order, org }: Props) {
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<>
			<Button
				className="w-full md:w-auto"
				onClick={handlePrint}
				variant="outline"
			>
				Via Cliente
			</Button>
			<div className="hidden">
				<CustomerReceipt ref={componentRef} order={order} org={org} />
			</div>
		</>
	)
}

export const CustomerReceipt = forwardRef<HTMLDivElement, Props>(({
	order,
	org
}, ref) => {
	return (
		<div ref={ref} className="w-1/2 border border-dashed bg-white text-gray-900">
			<div className="w-full p-4 flex flex-row justify-between gap-4 bg-gradient-to-b from-gray-400 to-white">
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

			<div className="w-11/12 mx-auto pb-4 mt-1">
				<p className="font-medium text-sm mb-1">Itens</p>

				{order.Frame.map((frame) => (
					<div key={frame.id} className="flex p-1 border-b border-gray-100 flex-row w-full justify-between gap-4">
						<p className="text-xs">{frame.name}</p>
						<p className="text-xs">{frame.price.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}</p>
					</div>
				))}

				{order.Lenses.map((lenses) => (
					<div key={lenses.id} className="flex flex-row w-full p-1 border-b border-gray-100 justify-between gap-4">
						<p className="text-xs">{lenses.name}</p>
						<p className="text-xs">{lenses.price.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}</p>
					</div>
				))}

				<div className="flex flex-row w-full mt-2 justify-between gap-4">
					<p className="font-medium text-sm" >Desconto</p>
					<p className="font-medium text-sm" >{order.discount?.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}</p>
				</div>

				<div className="flex flex-row w-full mt-2 justify-between gap-4">
					<p className="font-medium text-sm" >Total</p>
					<p className="font-medium text-sm" >{order.total.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}</p>
				</div>

				<p className="font-medium text-sm mb-1 mt-4">Pagamentos</p>
				{order.Payments.map((payment) => (
					<div key={payment.id} className="flex flex-row w-full p-1 border-b border-gray-100 justify-between gap-4">
						<p className="text-xs">{payment.createdAt.toLocaleDateString()}</p>
						<p className="text-xs">{paymentType[payment.type as keyof typeof paymentType]}</p>
						<p className="text-xs">{payment.amount.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}</p>
					</div>
				))}
				<div className="flex flex-row w-full mt-2 justify-between gap-4">
					<p className="font-medium text-sm" >Resta</p>
					<p className="font-medium text-sm" >{order.rest.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}</p>
				</div>
				<div className="flex flex-row w-full mt-2 justify-between gap-4">
					<p className="font-medium text-sm" >Situação</p>
					<p className="font-medium text-sm" >
						{order.status ? 'Pago' : 'Não pago'}
					</p>
				</div>
			</div>
		</div>
	);
});

CustomerReceipt.displayName = 'CustomerReceipt';
