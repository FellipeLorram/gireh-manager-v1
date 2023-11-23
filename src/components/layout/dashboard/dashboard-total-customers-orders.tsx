import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/utils/api'
import React from 'react'

export function DashboardTotalCustomersOrders() {
	const { data } = api.reports.numberOfOrdersAndCustomers.useQuery()

	return (
		<div className='w-full flex flex-row gap-2'>
			<div className="p-4 rounded border w-full">
				<p className="text-xs text-muted-foreground">
					Total de Clientes
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.numberOfOrders?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>
			<div className="p-4 rounded border w-full">
				<p className="text-xs text-muted-foreground">
					Total de Vendas
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.numberOfOrders?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>
		</div>
	)
}
