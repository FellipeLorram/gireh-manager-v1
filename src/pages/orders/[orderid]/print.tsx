import { ArrowLeftCircle, CircleDashed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { PrintCustomerReceipt } from "@/components/layout/printer/print-customer-receipt";
import { PrintLaborCopy } from "@/components/layout/printer/print-labor-copy";
import { PrintLaborCopyAndCustomerReceipt } from "@/components/layout/printer/print-labor-copy-and-customer-receipt";
import { api } from "@/utils/api";
import { PrintCreditInstallments } from "@/components/layout/printer/print-credit-installments";

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
				<Link href={`/orders/${order?.id}`}>
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl font-bold text-center mx-auto">OS: {order?.service_order}</h1>
			</div>
			{isLoading ? <CircleDashed className="w-8 h-8 my-auto stroke-muted-foreground animate-spin" /> : (
				<>
					<div className="w-full p-4 border rounded mt-8">
						<p className="text-lg font-medium mb-2">
							Venda
						</p>
						<div className="flex flex-wrap gap-4">
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
					</div>
					{order?.running_credit && (
						<div className="w-full p-4 border rounded mt-4">
							<p className="text-lg font-medium mb-2">
								Crediário
							</p>
	
							<div className="flex flex-wrap gap-4">
								<PrintCreditInstallments
									order={order}
									org={org!}
								/>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}
