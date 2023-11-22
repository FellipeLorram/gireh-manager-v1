import { useRouter } from "next/router";
import { type Frame, type Lenses, type Payments, type Order } from "@prisma/client";
import { DataTable } from "./tables/table-raw";
import { OrderPageFrameColumnDef } from "./tables/frame-column-def";
import { OrderPageLensesColumnDef } from "./tables/lenses-column-def";
import { PaymentColumnDef } from "./tables/payment-column-def";
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
      <div className="border rounded-md p-4">
        <p className='font-semibold mb-2'>Pagamentos</p>
        <DataTable
          columns={PaymentColumnDef}
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


