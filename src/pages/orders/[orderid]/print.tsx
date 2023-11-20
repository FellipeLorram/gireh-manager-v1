import { PrintCustomerReceipt } from "@/components/layout/print-customer-receipt";
import { PrintLaborCopy } from "@/components/layout/print-labor-copy";
import { PrintLaborCopyAndCustomerReceipt } from "@/components/layout/print-labor-copy-and-customer-receipt";
import { api } from "@/utils/api";
import { ArrowLeftCircle, CircleDashed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
	const { query } = useRouter();
	const { data: order, } = api.order.get.useQuery({
		id: query.orderid as string,
	}, {
		enabled: !!query.orderid,
	});
	const { data: org, isLoading } = api.org.get.useQuery();

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4">
			<div className="w-full flex flex-row">
				<Link href={`/customers/${order?.customerId}/orders/${order?.id}`}>
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl font-bold text-center mx-auto">OS: {order?.service_order}</h1>
			</div>
			{isLoading ? <CircleDashed className="w-8 h-8 my-auto stroke-muted-foreground animate-spin" /> : (
				<div className="flex flex-wrap gap-4 mt-8 w-full">
					<PrintCustomerReceipt
						order={order!}
						org={org!}
					/>

					<PrintLaborCopy
						order={order!}
						org={org!}
					/>

					<PrintLaborCopyAndCustomerReceipt
						order={order!}
						org={org!}
					/>

				</div>
			)}

		</div>
	)
}
