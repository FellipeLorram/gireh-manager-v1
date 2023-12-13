import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { OrderColumnDef } from "@/components/layout/tables/order-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { api } from "@/utils/api";

export default function Page() {
	const { data } = api.order.list.useQuery();

	return (
		<DashboardLayout>
			<div className="w-full border rounded p-4">
				<DataTable
					columns={OrderColumnDef}
					filterField="customer_name"
					data={data ?? []}
				/>
			</div>
		</DashboardLayout>
	)
}
