import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { customerColumnDef } from "@/components/layout/tables/customer-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { api } from "@/utils/api";

export default function Page() {
	const { data } = api.customer.list.useQuery();

	return (
		<DashboardLayout>
			<div className="w-full p-4 border rounded">
				<DataTable
					columns={customerColumnDef}
					filterField="name"
					data={data ?? []}
				/>
			</div>
		</DashboardLayout>
	)
}
