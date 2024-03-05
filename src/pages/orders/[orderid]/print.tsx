import { useRouter } from "next/router";

import { PrintCustomerReceipt } from "@/components/layout/printer/print-customer-receipt";
import { PrintLaborCopy } from "@/components/layout/printer/print-labor-copy";
import { PrintLaborCopyAndCustomerReceipt } from "@/components/layout/printer/print-labor-copy-and-customer-receipt";
import { api } from "@/utils/api";
import { PrintCreditInstallments } from "@/components/layout/printer/print-credit-installments";
import { CentralizedLayout } from "@/components/layout/centralized-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
	const { query } = useRouter();
	const { data: order, } = api.order.get.useQuery({
		id: query.orderid as string,
	}, {
		enabled: !!query.orderid,
	});
	const { data: org } = api.org.get.useQuery();

	if (!order || !org) return <Loading />

	return (
		<CentralizedLayout>
			<Card>
				<CardHeader>
					<CardTitle>
						Imprimir venda
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					<PrintCustomerReceipt
						order={order}
						org={org}
					/>

					<PrintLaborCopy
						order={order}
						org={org}
					/>

					<PrintLaborCopyAndCustomerReceipt
						order={order}
						org={org}
					/>
				</CardContent>
			</Card>
			{order?.running_credit && (
				<div className="w-full p-4 border rounded mt-4">
					<p className="text-lg font-medium mb-2">
						Crediário
					</p>

					<div className="flex flex-wrap gap-4">
						<PrintCreditInstallments
							order={order}
							org={org}
						/>
					</div>
				</div>
			)}
		</CentralizedLayout>
	)
}

function Loading() {
	return (
		<CentralizedLayout>
			<Skeleton className="w-full h-[350px]" />
		</CentralizedLayout>
	)
}
