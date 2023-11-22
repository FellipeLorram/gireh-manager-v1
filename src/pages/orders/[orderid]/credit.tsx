import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftCircle } from "lucide-react";
import { api } from "@/utils/api";
import { PrintCreditInstallments } from "@/components/layout/print-credit-installments";

export default function Page() {
  const { query } = useRouter();
  const { data: order } = api.order.get.useQuery({
    id: query.orderid as string,
  }, {
    enabled: !!query.orderid,
  });
  const { data: org, isLoading } = api.org.get.useQuery();

  return (
    <div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4">
      <div className="w-full flex flex-row">
        <Link href={`/orders/${order?.id}`}>
          <ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
        </Link>

        <h1 className="text-xl font-bold text-center mx-auto">OS: {order?.service_order}</h1>
      </div>
      <div className="w-full flex justify-between flex-row p-4 border rounded mt-8">
        <p>
          Total
        </p>
        <p>
          {order?.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="w-full flex justify-between flex-row p-4 border rounded mt-4 mb-8">
        <p>
          Valor faltante
        </p>
        <p>
          {order?.rest.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      {!isLoading && (
        <PrintCreditInstallments
          order={order!}
          org={org!}
        />
      )}

    </div>
  )
}
