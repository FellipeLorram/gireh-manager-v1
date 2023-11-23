import CustomerInfo from '@/components/layout/customer-info'
import EditCustomerDialog from '@/components/layout/edit-customer-sheet'
import { RemoveCustomerDialog } from '@/components/layout/remove-customer-dialog'
import { customerPageAppointmentColumnDef } from '@/components/layout/tables/appointment-column-def'
import { customerPageOrderColumnDef } from '@/components/layout/tables/order-column-def'
import { DataTable } from '@/components/layout/tables/table-raw'
import { Button, buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/utils/api'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Page() {
	const { toast } = useToast();
	const { customerid } = useRouter().query;
	const { data: orderList } = api.order.listCustomerOrders.useQuery({
		customerId: customerid as string,
	})
	const { data: appointmentList } = api.appointment.listCustomerAppointments.useQuery({
		customerId: customerid as string,
	});
	const { mutate } = api.customer.update.useMutation({
		onSuccess: () => {
			toast({
				title: 'Cliente adicionado a fila de exame',
			})
		}
	});

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4">
			<div className="w-full flex flex-row mb-8">
				<Link href="/">
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>
			</div>

			<CustomerInfo id={customerid as string} />

			<div className="border rounded-md p-4 flex flex-wrap gap-4 w-full mt-4">
				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-full md:w-auto',
					})}
					href={`/customers/${customerid as string}/send-message?message=`}
				>
					Enviar Mensagem
				</Link>

				<Button
					variant='outline'
					className='w-full md:w-auto'
					onClick={() => mutate({ id: customerid as string, inLine: true })}
				>
					Adicionar na Fila de Exame
				</Button>

				<EditCustomerDialog
					id={customerid as string}
				/>
			</div>

			<div className='w-full mt-4 p-4 border rounded'>
				<div className='w-full flex flex-row justify-between items-center mb-2'>
					<h1 className='text-lg font-semibold'>
						Compras
					</h1>

					<Link
						className={buttonVariants({
							variant: 'secondary',
						})}
						href={`/customers/${customerid as string}/new-order`}
					>
						Adicionar
					</Link>
				</div>

				<DataTable
					data={orderList ?? []}
					columns={customerPageOrderColumnDef}
				/>
			</div>
			<div className='w-full mt-4 p-4 border rounded'>

				<div className='w-full flex flex-row justify-between items-center mb-2'>
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
			</div>

			<div className='w-full bg-red-100/10 dark:bg-red-900/10 border dark:border-red-950 border-red-200 flex items-center justify-end p-4 mt-10 rounded'>
				<RemoveCustomerDialog />
			</div>
		</div>
	)
}
