import { api } from "@/utils/api";
import { DataTable } from "../tables/table-raw";
import { useRange } from "./atoms";
import { AppointmentColumnDef } from "../tables/appointment-column-def";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DailyAppointments() {
	const { range } = useRange();
	const { data } = api.appointment.listAppointmentsByRange.useQuery({
		startDate: range.start,
		endDate: range.end,
	});

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