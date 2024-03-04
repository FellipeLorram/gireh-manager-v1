import { api } from "@/utils/api";
import { customerInLineColumnDef } from "@/components/layout/tables/customer-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function InLineCustomers() {
	const { data } = api.customer.listCustomersInLine.useQuery();

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Fila de Exame</CardTitle>
			</CardHeader>
			<CardContent>
				{data ? <DataTable
					data={data}
					columns={customerInLineColumnDef}
				/> : <Skeleton className="w-full h-[150px]" />}
			</CardContent>
		</Card>
	)
}
