import { api } from "@/utils/api";
import { DataTable } from "../tables/table-raw";
import { useRange } from "./atoms";
import { dailyOrderColumnDef } from "../tables/order-column-def";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DailyOrders() {
	const { range } = useRange();
	const { data } = api.order.listOrdersByDateRange.useQuery({
		startDate: range.start,
		endDate: range.end,
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Vendas</CardTitle>
			</CardHeader>
			<CardContent>
				{data ? <DataTable
					data={data ?? []}
					columns={dailyOrderColumnDef}
				/> : <Skeleton className="w-full h-[150px]" />}
			</CardContent>
		</Card>
	)
}
