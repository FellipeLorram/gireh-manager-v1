import { useRouter } from "next/router";
import { type Frame, type Lenses, type Payments, type Order } from "@prisma/client";
import { DataTable } from "../tables/table-raw";
import { OrderPageFrameColumnDef } from "../tables/frame-column-def";
import { OrderPageLensesColumnDef } from "../tables/lenses-column-def";
import { OrderPagePaymentColumnDef } from "../tables/payment-column-def";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle>Exame</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Armações</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={OrderPageFrameColumnDef}
            data={order?.Frame ?? []}
          />
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Lentes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={OrderPageLensesColumnDef}
            data={order?.Lenses ?? []}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Observações</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{order?.observation}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Total</CardTitle>
          <p className="text-lg">
            {order?.total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Restante</CardTitle>
          <p className="text-lg">
            {order?.rest.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </CardHeader>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Crediário</CardTitle>
        </CardHeader>
        <CardContent>
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

        </CardContent>
        <CardFooter className="flex flex-wrap gap-4 w-full">
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
            disabled={!order?.running_credit}
            onClick={() => push(`/orders/${order?.id}/print`)}
          >
            Imprimir Crediário
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle>Pagamentos</CardTitle>
          <Button
            onClick={() => push(`/orders/${order?.id}/payments/new`)}
            disabled={order?.status}
          >
            Adicionar
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={OrderPagePaymentColumnDef}
            data={order?.Payments ?? []}
          />
        </CardContent>
      </Card>
    </div>
  )
}


