import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { customerColumnDef } from "@/components/layout/tables/customer-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/utils/api";
import Link from "next/link";

export default function Page() {
	const { data } = api.customer.list.useQuery();

	return (
		<DashboardLayout>
			<Link
				className={buttonVariants({ className: 'w-full mb-4 md:hidden' })}
				href="/customers/new">
				Novo Cliente
			</Link>
			<div className="w-full p-4 border rounded">
				<DataTable
					columns={customerColumnDef}
					filterField="name"
					data={data ?? []}
				/>
			</div>
		</DashboardLayout>
	)
}
