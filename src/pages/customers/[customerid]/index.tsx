import { useRouter } from 'next/router'
import { CentralizedLayout } from '@/components/layout/centralized-layout'
import CustomerInfo from '@/components/layout/customer/customer-info'
import { RemoveCustomerDrawer } from '@/components/layout/customer/remove-customer-drawer'
import { CustomerOrdersList } from '@/components/layout/customer/customer-orders-list'
import { CustomerAppointmentList } from '@/components/layout/customer/customer-appointments-list'
import CustomerActions from '@/components/layout/customer/customer-actions'

export default function Page() {
	const { customerid } = useRouter().query;

	return (
		<CentralizedLayout>
			<CustomerInfo id={customerid as string} />

			<CustomerActions />
			<CustomerOrdersList />
			<CustomerAppointmentList />

			<div className='w-full bg-red-100/10 dark:bg-red-900/10 border dark:border-red-950 border-red-200 flex items-center justify-end p-4 mt-10 rounded'>
				<RemoveCustomerDrawer />
			</div>

		</CentralizedLayout>
	)
}
