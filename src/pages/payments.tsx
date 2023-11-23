import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PaymentColumnDef } from "@/components/layout/tables/payment-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { api } from "@/utils/api";

export default function Page() {
	const { data } = api.payment.listAll.useQuery({});

	return (
		<DashboardLayout>
			<div className="w-full mt-10">
				<DataTable
					columns={PaymentColumnDef}
					data={data ?? []}
				/>
			</div>
		</DashboardLayout>
	)
}
