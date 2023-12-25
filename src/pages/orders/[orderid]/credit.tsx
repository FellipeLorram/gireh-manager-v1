import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeftCircle } from "lucide-react";
import { api } from "@/utils/api";
import { CreditForm, type CreditFormValues } from "@/components/forms/credit-form";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { query, push } = useRouter();
  const { toast } = useToast();
  const orderid = query.orderid as string;
  const { data: order } = api.order.get.useQuery({
    id: orderid,
  }, {
    enabled: !!query.orderid,
  });

  const { mutate, isLoading } = api.order.startCredit.useMutation({
    onSuccess: async () => {
      toast({
        description: "Crediário iniciado com sucesso!",
      });
      await push(`/orders/${orderid}`);
    }
  });

  const onSubmit = (data: CreditFormValues) => {
    mutate({
      id: orderid,
      installments: parseInt(data.installments),
      payment_day: parseInt(data.payment_day),
    });
  }

  return (
    <div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4">
      <div className="w-full flex flex-row">
        <Link href={`/orders/${order?.id}`}>
          <ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
        </Link>

        <h1 className="text-xl font-bold text-center mx-auto">OS: {order?.service_order}</h1>
      </div>
      <div className="w-full flex justify-between flex-row p-4 border rounded mt-4">
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

      <div className="w-full flex justify-between flex-row p-4 border rounded mt-4 mb-4">
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

      <div className="border rounded p-4 w-full">
        <CreditForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          rest={order?.rest ?? 0}
        />
      </div>

    </div>
  )
}
