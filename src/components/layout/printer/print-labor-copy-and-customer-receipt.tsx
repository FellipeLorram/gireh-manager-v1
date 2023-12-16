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
import { CustomerReceipt } from "./print-customer-receipt";
import { LaborCopy } from "./print-labor-copy";
import { api } from "@/utils/api";

type OrderWithItems = Order & {
	Frame: Frame[];
	Lenses: Lenses[];
	Payments: Payments[];
}

interface Props {
	order: OrderWithItems;
	org: Org;
}

export function PrintLaborCopyAndCustomerReceipt({ order, org }: Props) {
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	const { data } = api.customer.get.useQuery({
		id: order.customerId,
	}, {
		enabled: !!order.customerId,
	});

	return (
		<>
			<Button
				className="w-full md:w-auto"
				onClick={handlePrint}
			>
				Ambas
			</Button>
			<div className="hidden">
				<LaborCopyAndCustomerReceipt
					ref={componentRef}
					order={order}
					org={org}
					phone={data?.Phone[0]?.number}
				/>
			</div>
		</>
	)
}

export const LaborCopyAndCustomerReceipt = forwardRef<HTMLDivElement, Props & {
	phone?: string;
}>(({
	order,
	org,
	phone,
}, ref) => {
	return (
		<div ref={ref} className="w-full flex flex-row">
			<CustomerReceipt order={order} org={org} />
			<LaborCopy phone={phone} order={order} org={org} />
		</div>
	);
});

LaborCopyAndCustomerReceipt.displayName = 'LaborCopyAndCustomerReceipt';
