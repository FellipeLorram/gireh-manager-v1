import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api";

export function DashboardLastWeekReport() {
  const { data } = api.reports.dashboardLastWeekReport.useQuery();

  return (
    <div className="w-full mt-8 p-4 border rounded">
      <p className="mb-2">
        Dados da Semana
      </p>
      <div className='flex w-full flex-col md:flex-row gap-2'>
        <div className='w-full flex flex-row gap-2'>
          <div className="p-4 rounded border w-full">
            <p className="text-xs text-muted-foreground">
              Novos clientes
            </p>
            <p className="md:text-xl text-lg mt-2">
              {data?.newCustomers ?? <Skeleton className="w-10 h-6 rounded" />}
            </p>
          </div>
          <div className="p-4 rounded border w-full">
            <p className="text-xs text-muted-foreground">
              Vendas
            </p>
            <p className="md:text-xl text-lg mt-2">
              {data?.numberOfOrders ?? <Skeleton className="w-10 h-6 rounded" />}
            </p>

          </div>
        </div>

        <div className='w-full flex flex-row gap-2'>
          <div className="p-4 rounded border w-full">
            <p className="text-xs text-muted-foreground">
              Entrada
            </p>
            <p className="md:text-xl text-lg mt-2">
              {data?.moneyEntry.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? <Skeleton className="w-10 h-6 rounded" />}
            </p>
          </div>
          <div className="p-4 rounded border w-full">
            <p className="text-xs text-muted-foreground">
              Total de Vendas
            </p>
            <p className="md:text-xl text-lg mt-2">
              {data?.orderTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? <Skeleton className="w-10 h-6 rounded" />}
            </p>
          </div>
        </div>
      </div>

    </div>

  )
}
