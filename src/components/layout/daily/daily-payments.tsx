import { api } from "@/utils/api";
import { DataTable } from "../tables/table-raw";
import { useRange } from "./atoms";
import { PaymentColumnDef } from "../tables/payment-column-def";

export function DailyPayments() {
	const { range } = useRange();
	const { data } = api.payment.listAllByRange.useQuery({
		startDate: range.start,
		endDate: range.end,
	});

	return (
		<div className="border rounded p-4 w-full">
			<p className="mb-4">
				Pagamentos
			</p>
			<DataTable
				data={data ?? []}
				columns={PaymentColumnDef}
			/>
		</div>
	)
}