import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { CreditForm, type CreditFormValues } from "@/components/forms/credit-form";
import { useToast } from "@/components/ui/use-toast";
import { CentralizedLayout } from "@/components/layout/centralized-layout";

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
    <CentralizedLayout>
      <div className="w-full flex justify-between flex-row p-4 border rounded">
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

      <div className="w-full flex justify-between flex-row p-4 border rounded my-4">
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
    </CentralizedLayout>
  )
}
