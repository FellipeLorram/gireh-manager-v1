import { api } from "@/utils/api";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PaymentColumnDef } from "@/components/layout/tables/payment-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
	const { data } = api.payment.listAll.useQuery();

	return (
		<DashboardLayout>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Pagamentos</CardTitle>
				</CardHeader>
				<CardContent>
					{data ? <DataTable
						data={data}
						columns={PaymentColumnDef}
					/> : <Skeleton className="w-full h-[150px]" />}
				</CardContent>
			</Card>
		</DashboardLayout>
	)
}
