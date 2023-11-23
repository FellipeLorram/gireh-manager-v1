import { api } from "@/utils/api";
import { DataTable } from "../tables/table-raw";
import { useRange } from "./atoms";
import { dailyOrderColumnDef } from "../tables/order-column-def";

export function DailyOrders() {
	const { range } = useRange();
	const { data } = api.order.listOrdersByDateRange.useQuery({
		startDate: range.start,
		endDate: range.end,
	});

	return (
		<div className="border rounded p-4 w-full">
			<p className="mb-4">
				Vendas
			</p>
			<DataTable
				data={data ?? []}
				columns={dailyOrderColumnDef}
			/>
		</div>
	)
}