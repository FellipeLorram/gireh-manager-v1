import { api } from "@/utils/api";
import { DataTable } from "../tables/table-raw";
import { useRange } from "./atoms";
import { PaymentColumnDef } from "../tables/payment-column-def";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DailyPayments() {
	const { range } = useRange();
	const { data } = api.payment.listAllByRange.useQuery({
		startDate: range.start,
		endDate: range.end,
	});

	return (
		<Card>
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
	)
}