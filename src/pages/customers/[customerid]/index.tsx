import CustomerInfo from '@/components/layout/customer-info'
import { RemoveCustomerDialog } from '@/components/layout/remove-customer-dialog'
import { customerPageAppointmentColumnDef } from '@/components/layout/tables/appointment-column-def'
import { customerPageOrderColumnDef } from '@/components/layout/tables/order-column-def'
import { DataTable } from '@/components/layout/tables/table-raw'
import { buttonVariants } from '@/components/ui/button'
import { api } from '@/utils/api'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Page() {
	const { customerid } = useRouter().query;
	const { data: orderList } = api.order.listCustomerOrders.useQuery({
		customerId: customerid as string,
	})
	const { data: appointmentList } = api.appointment.list.useQuery();

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4">
			<div className="w-full flex flex-row mb-8">
				<Link href="/">
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>
			</div>

			<CustomerInfo id={customerid as string} />

			<div className='w-full flex flex-row justify-between items-center mt-8 mb-2'>
				<h1 className='text-lg font-semibold'>
					Compras
				</h1>

				<Link
					className={buttonVariants({
						variant: 'secondary',
					})}
					href={`/customers/${customerid as string}/orders/new`}
				>
					Adicionar
				</Link>
			</div>

			<DataTable
				data={orderList ?? []}
				columns={customerPageOrderColumnDef}
			/>

			<div className='w-full flex flex-row justify-between items-center mt-8 mb-2'>
				<h1 className='text-lg font-semibold'>
					Consultas
				</h1>

				<Link
					className={buttonVariants({
						variant: 'secondary',
					})}
					href={`/customers/${customerid as string}/new-appointment`}
				>
					Adicionar
				</Link>
			</div>

			<DataTable
				data={appointmentList ?? []}
				columns={customerPageAppointmentColumnDef}
			/>

			<div className='w-full bg-red-500/10 flex items-center justify-end p-4 mt-10 rounded'>
				<RemoveCustomerDialog />
			</div>
		</div>
	)
}
