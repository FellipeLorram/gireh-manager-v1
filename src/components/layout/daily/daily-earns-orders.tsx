import { Skeleton } from '@/components/ui/skeleton';
import { useRange } from './atoms'
import { api } from '@/utils/api';

export function DailyEarnsOrders() {
	const { range } = useRange();
	const { data } = api.reports.reportPerRange.useQuery({
		startDate: range.start,
		endDate: range.end,
	})

	return (
		<div className='w-full flex flex-wrap gap-1 md:gap-2 mt-4'>

			<div className="p-4 rounded border w-[49%] md:max-w-[14rem]">
				<p className="text-xs text-muted-foreground">
					Total de Vendas
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.numberOfOrders ?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>
			<div className="p-4 rounded border w-[49%] md:max-w-[14rem]">
				<p className="text-xs text-muted-foreground">
					Clientes Novos
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.newCustomers ?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>
			<div className="p-4 rounded border w-[49%] md:max-w-[14rem]">
				<p className="text-xs text-muted-foreground">
					Consultas
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.appointments ?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>

			<div className="p-4 rounded border w-[49%] md:max-w-[14rem]">
				<p className="text-xs text-muted-foreground">
					Total Vendas (R$)
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.orderTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>

			<div className="p-4 rounded border w-[49%] md:max-w-[14rem]">
				<p className="text-xs text-muted-foreground">
					Entrada (R$)
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.moneyEntry.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>

			<div className="p-4 rounded border w-[49%] md:max-w-[14rem]">
				<p className="text-xs text-muted-foreground">
					Restante (R$)
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.moneyToEntry.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>
			<div className="p-4 rounded border w-[49%] md:max-w-[14rem]">
				<p className="text-xs text-muted-foreground">
					Vendas Não Pagas
				</p>
				<p className="md:text-xl text-lg mt-2">
					{data?.notPaidOrders.length ?? <Skeleton className="w-10 h-6 rounded" />}
				</p>
			</div>
		</div>
	)
}
