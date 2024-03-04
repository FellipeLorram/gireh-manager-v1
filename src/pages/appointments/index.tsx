import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { InLineCustomers } from "@/components/layout/appointments/in-line-customers";
import { AppointmentsTable } from "@/components/layout/appointments/appointments-table";

export default function Page() {
	return (
		<DashboardLayout>
			<div className="w-full flex flex-col gap-4">
				<InLineCustomers />
				<AppointmentsTable />
			</div>
		</DashboardLayout>
	)
}
