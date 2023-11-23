import { api } from "@/utils/api";
import { DataTable } from "../tables/table-raw";
import { useRange } from "./atoms";
import { AppointmentColumnDef } from "../tables/appointment-column-def";

export function DailyAppointments() {
	const { range } = useRange();
	const { data } = api.appointment.listAppointmentsByRange.useQuery({
		startDate: range.start,
		endDate: range.end,
	});

	return (
		<div className="border rounded p-4 w-full">
			<p className="mb-4">
				Consultas
			</p>
			<DataTable
				data={data ?? []}
				columns={AppointmentColumnDef}
			/>
		</div>
	)
}