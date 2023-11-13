import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { customerColumnDef } from "@/components/layout/tables/customer-column-def";
import { OrderColumnDef } from "@/components/layout/tables/order-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { api } from "@/utils/api";

export default function Page() {
	const { data } = api.order.list.useQuery();

	return (
		<DashboardLayout>
			<div className="w-full mt-10">
				
				<DataTable
					columns={OrderColumnDef}
					filterField="name"
					data={data ?? []}
				/>
			</div>
		</DashboardLayout>
	)
}
