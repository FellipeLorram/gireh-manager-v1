import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AppointmentColumnDef } from "@/components/layout/tables/appointment-column-def";
import { customerInLineColumnDef } from "@/components/layout/tables/customer-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { api } from "@/utils/api";

export default function Page() {
	const { data } = api.appointment.list.useQuery();
	const { data: customers } = api.customer.listCustomersInLine.useQuery();

	return (
		<DashboardLayout>
			<div className="w-full">
				<div className="w-full border rounded mb-4 p-4">
					<p className="text-lg mb-4">
						Fila de Exame
					</p>
					<DataTable
						columns={customerInLineColumnDef}
						data={customers ?? []}
					/>
				</div>
				<div className="w-full border rounded p-4">
					<p className="text-lg mb-4">
						Consultas
					</p>
					<DataTable
						columns={AppointmentColumnDef}
						filterField="customerMame"
						data={data ?? []}
					/>
				</div>
			</div>
		</DashboardLayout>
	)
}
