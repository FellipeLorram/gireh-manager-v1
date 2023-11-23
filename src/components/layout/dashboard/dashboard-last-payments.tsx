import { api } from "@/utils/api";
import { DataTable } from "../tables/table-raw";
import { PaymentColumnDef } from "../tables/payment-column-def";

export function DashboardLastPayments() {
	const { data } = api.payment.listAll.useQuery({
		limit: 5,
	});

	return (
		<div className="border rounded p-4 w-full">
			<p className="mb-4">
				Últimos Pagamentos
			</p>
			<DataTable
				data={data ?? []}
				columns={PaymentColumnDef}
			/>
		</div>
	)
}