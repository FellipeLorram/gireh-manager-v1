import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { customerColumnDef } from "@/components/layout/tables/customer-column-def";
import { DataTable } from "@/components/layout/tables/table-raw";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api";

export default function Page() {
	const { data } = api.customer.list.useQuery();

	return (
		<DashboardLayout>
			<Link
				className={buttonVariants({ className: 'w-full mb-4 md:hidden' })}
				href="/customers/new">
				Novo Cliente
			</Link>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Clientes</CardTitle>
				</CardHeader>
				<CardContent>
					{data ? <DataTable
						data={data}
						filterField="name"
						columns={customerColumnDef}
					/> : <Skeleton className="w-full h-[150px]" />}
				</CardContent>
			</Card>
		</DashboardLayout>
	)
}
