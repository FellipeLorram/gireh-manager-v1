import { useRouter } from "next/router";
import { type Frame, type Lenses, type Payments, type Order } from "@prisma/client";
import { DataTable } from "./tables/table-raw";
import { OrderPageFrameColumnDef } from "./tables/frame-column-def";
import { OrderPageLensesColumnDef } from "./tables/lenses-column-def";
import { OrderPagePaymentColumnDef } from "./tables/payment-column-def";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button";

type OrderWithItems = Order & {
  Frame: Frame[];
  Lenses: Lenses[];
  Payments: Payments[];
}

interface Props {
  order: OrderWithItems | undefined | null;
}

export function OrderInfo({ order }: Props) {
  const { push } = useRouter();
  console.log(order)
  return (
    <div className="w-full space-y-4">
      <div className="border rounded-md p-4 w-full">
        <p className='font-semibold'>Exame</p>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead />
              <TableHead>Esf</TableHead>
              <TableHead>Cil</TableHead>
              <TableHead>Eixo</TableHead>
              <TableHead>DNP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>OD</TableCell>
              <TableCell>{order?.esf_right}</TableCell>
              <TableCell>{order?.cil_right}</TableCell>
              <TableCell>{order?.axle_right}</TableCell>
              <TableCell>{order?.dnp_right}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>OD</TableCell>
              <TableCell>{order?.esf_left}</TableCell>
              <TableCell>{order?.cil_left}</TableCell>
              <TableCell>{order?.axle_left}</TableCell>
              <TableCell>{order?.dnp_left}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ADD</TableCell>
              <TableCell />
              <TableCell>{order?.add}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="border rounded-md p-4">
        <p className='font-semibold mb-2'>Armações</p>
        <DataTable
          columns={OrderPageFrameColumnDef}
          data={order?.Frame ?? []}
        />
      </div>

      <div className="border rounded-md p-4">
        <p className='font-semibold mb-2'>Lentes</p>
        <DataTable
          columns={OrderPageLensesColumnDef}
          data={order?.Lenses ?? []}
        />
      </div>

      <div className="border rounded-md p-4">
        <p className='font-semibold'>Observações</p>
        <p className='mt-2'>{order?.observation}</p>
      </div>

      <div className="border rounded-md p-4 flex flex-row justify-between">
        <p className='font-semibold text-lg'>Total</p>
        <p className="text-lg">
          {order?.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      <div className="border rounded-md p-4 flex flex-row justify-between">
        <p className='font-semibold text-lg'>Restante</p>
        <p className="text-lg">
          {order?.rest.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      <div className="w-full rounded p-4 border">
        <p className='font-semibold mb-2'>Crediário</p>
        {!order?.status ? (
          <>
            {!order?.running_credit ? (
              <p className="text-muted-foreground mb-2">
                Essa venda não possui um crediário.
              </p>
            ) : (
              <Table className="mb-2">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Inicio</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Parcelado Em</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{order?.credit_start_date?.toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>Dia {order?.credit_payment_days}</TableCell>
                    <TableCell>{order?.credit_installments}x</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </>
        ) : (
          <p className="text-muted-foreground mb-2">
            Essa venda já foi paga.
          </p>
        )}
        <div className="flex flex-wrap gap-4 w-full">
          <Button
            variant="secondary"
            className="w-full md:w-auto"
            disabled={order?.status}
            onClick={() => push(`/orders/${order?.id}/credit`)}
          >
            {order?.running_credit ? 'Editar' : 'Iniciar'}
          </Button>
          <Button
            variant="secondary"
            className="w-full md:w-auto"
            disabled={order?.running_credit}
            onClick={() => push(`/orders/${order?.id}/print`)}
          >
            Imprimir Crediário
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <p className='font-semibold mb-2'>Pagamentos</p>
        <DataTable
          columns={OrderPagePaymentColumnDef}
          data={order?.Payments ?? []}
        />
        <Button
          onClick={() => push(`/orders/${order?.id}/payments/new`)}
          className="w-full md:w-auto mt-4"
          disabled={order?.status}
        >
          Adicionar Pagamento
        </Button>
      </div>
    </div>
  )
}


