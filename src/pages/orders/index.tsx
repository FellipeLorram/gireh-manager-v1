import { api } from "@/utils/api";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { OrderColumnDef } from "@/components/layout/tables/order-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
	const { data } = api.order.list.useQuery();

	return (
		<DashboardLayout>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Vendas</CardTitle>
				</CardHeader>
				<CardContent>
					{data ? <DataTable
						data={data}
						filterField="customer_name"
						columns={OrderColumnDef}
					/> : <Skeleton className="w-full h-[150px]" />}
				</CardContent>
			</Card>
		</DashboardLayout>
	)
}
