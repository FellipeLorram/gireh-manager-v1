import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="w-full mt-8 px-2 py-4 md:p-4 border rounded">
        <p className="mb-4">
          Dados da Semana
        </p>
        <div className="w-full flex flex-wrap md:flex-nowrap justify-center md:justify-start items-center flex-row md:gap-2">
          <div className="p-4 rounded-tl md:rounded border w-1/2 md:w-full">
            <p className="text-xs text-muted-foreground">
              Novos clientes
            </p>
            <p className="md:text-xl text-lg mt-2">
              0
            </p>
          </div>

          <div className="p-4 md:rounded rounded-tr border w-1/2 md:w-full">
            <p className="text-xs text-muted-foreground">
              Vendas
            </p>
            <p className="md:text-xl text-lg mt-2">
              0
            </p>
          </div>

          <div className="p-4 md:rounded rounded-bl border w-1/2 md:w-full">
            <p className="text-xs text-muted-foreground">
              Entrada
            </p>
            <p className="md:text-xl text-lg mt-2">
              {(0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>

          <div className="p-4 md:rounded rounded-br border w-1/2 md:w-full">
            <p className="text-xs text-muted-foreground">
              Total de Vendas
            </p>
            <p className="md:text-xl text-lg mt-2">
              {(0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 border rounded p-4 w-full">
        <p>Últimas Vendas</p>
        
      </div>
    </DashboardLayout>
  );
}
