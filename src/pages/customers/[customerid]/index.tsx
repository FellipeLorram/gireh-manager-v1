import Link from 'next/link'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import { CentralizedLayout } from '@/components/layout/centralized-layout'
import { DataTable } from '@/components/layout/tables/table-raw'
import CustomerInfo from '@/components/layout/customer-info'
import { customerPageAppointmentColumnDef } from '@/components/layout/tables/appointment-column-def'
import { customerPageOrderColumnDef } from '@/components/layout/tables/order-column-def'
import { Button, buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { CircleDashed } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { RemoveCustomerDrawer } from '@/components/layout/customer/remove-customer-drawer'

export default function Page() {
	const { toast } = useToast();
	const { customerid } = useRouter().query;
	const { data: orderList } = api.order.listCustomerOrders.useQuery({
		customerId: customerid as string,
	})
	const { data: appointmentList } = api.appointment.listCustomerAppointments.useQuery({
		customerId: customerid as string,
	});

	const { mutate, isLoading } = api.customer.update.useMutation({
		onSuccess: () => {
			toast({
				title: 'Cliente adicionado a fila de exame',
			});
		}
	});

	return (
		<CentralizedLayout>
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
					disabled={isLoading}
					variant='outline'
					className='w-full md:w-auto'
					onClick={() => mutate({ id: customerid as string, inLine: true })}
				>
					{isLoading && <CircleDashed className='animate-spin' size={24} />}
					Adicionar na Fila de Exame
				</Button>

				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-full md:w-auto',
					})}
					href={`/customers/${customerid as string}/edit`}
				>
					Editar
				</Link>
			</div>

			<Card className='mt-4'>
				<CardHeader className='flex justify-between items-center flex-row'>
					<CardTitle>
						Compras
					</CardTitle>
					<Link
						className={buttonVariants({
							variant: 'secondary',
						})}
						href={`/customers/${customerid as string}/new-order`}
					>
						Adicionar
					</Link>
				</CardHeader>
				<CardContent>
					<DataTable
						data={orderList ?? []}
						columns={customerPageOrderColumnDef}
					/>
				</CardContent>
			</Card>
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
						data={appointmentList ?? []}
						columns={customerPageAppointmentColumnDef}
					/>
				</CardContent>
			</Card>

			<div className='w-full bg-red-100/10 dark:bg-red-900/10 border dark:border-red-950 border-red-200 flex items-center justify-end p-4 mt-10 rounded'>
				<RemoveCustomerDrawer />
			</div>
		</CentralizedLayout>
	)
}
