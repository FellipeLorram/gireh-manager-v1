import { useRouter } from "next/router";
import { api } from "@/utils/api";
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

interface Props {
  id: string
}

export function OrderInfo({ id }: Props) {
  const { push } = useRouter();
  const { data } = api.order.get.useQuery({
    id
  }, {
    enabled: !!id,
    refetchOnWindowFocus: true,
  });

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
              <TableCell>{data?.esf_right}</TableCell>
              <TableCell>{data?.cil_right}</TableCell>
              <TableCell>{data?.axle_right}</TableCell>
              <TableCell>{data?.dnp_right}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>OD</TableCell>
              <TableCell>{data?.esf_left}</TableCell>
              <TableCell>{data?.cil_left}</TableCell>
              <TableCell>{data?.axle_left}</TableCell>
              <TableCell>{data?.dnp_left}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ADD</TableCell>
              <TableCell />
              <TableCell>{data?.add}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="border rounded-md p-4">
        <p className='font-semibold mb-2'>Armações</p>
        <DataTable
          columns={OrderPageFrameColumnDef}
          data={data?.Frame ?? []}
        />
      </div>

      <div className="border rounded-md p-4">
        <p className='font-semibold mb-2'>Lentes</p>
        <DataTable
          columns={OrderPageLensesColumnDef}
          data={data?.Lenses ?? []}
        />
      </div>

      <div className="border rounded-md p-4">
        <p className='font-semibold'>Observações</p>
        <p className='mt-2'>{data?.observation}</p>
      </div>

      <div className="border rounded-md p-4 flex flex-row justify-between">
        <p className='font-semibold text-lg'>Total</p>
        <p className="text-lg">
          {data?.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      <div className="border rounded-md p-4 flex flex-row justify-between">
        <p className='font-semibold text-lg'>Restante</p>
        <p className="text-lg">
          {data?.rest.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      <div className="border rounded-md p-4">
        <p className='font-semibold mb-2'>Pagamentos</p>
        <DataTable
          columns={PaymentColumnDef}
          data={data?.Payments ?? []}
        />
        <Button
          onClick={() => push(`/orders/${data?.id}/payments/new`)}
          className="w-full md:w-auto mt-4"
          disabled={data?.status}
        >
          Adicionar Pagamento
        </Button>
      </div>
    </div>
  )
}


