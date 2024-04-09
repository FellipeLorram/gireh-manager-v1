import { api } from "@/utils/api";
import { DataTable } from "@/components/layout/tables/table-raw";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppointmentColumnDef } from "../tables/appointment-column-def";

export function AppointmentsTable() {
	const { data } = api.appointment.list.useQuery();

	
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Consultas</CardTitle>
			</CardHeader>
			<CardContent>
				{data ? <DataTable
					data={data}
					columns={AppointmentColumnDef}
				/> : <Skeleton className="w-full h-[150px]" />}
			</CardContent>
		</Card>
	)
}
