import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "../tables/table-raw";
import { Skeleton } from "@/components/ui/skeleton";
import { customerPageAppointmentColumnDef } from "../tables/appointment-column-def";

export function CustomerAppointmentList() {
	const { customerid } = useRouter().query;
	const { data } = api.appointment.listCustomerAppointments.useQuery({
		customerId: customerid as string,
	});

	if(!data) return <Skeleton className="w-full h-64" />

	return (
		<Card className='mt-4'>
		<CardHeader className='flex justify-between items-center flex-row'>
			<CardTitle>
				Consultas
			</CardTitle>
			<Link
				className={buttonVariants({
					variant: 'secondary',
				})}
				href={`/customers/${customerid as string}/new-appointment`}
			>
				Adicionar
			</Link>
		</CardHeader>
		<CardContent>
			<DataTable
				data={data}
				columns={customerPageAppointmentColumnDef}
			/>
		</CardContent>
	</Card>
	)
}
