import { OrderForm } from "@/components/forms/order-form";
import { type OrderFormFields } from "@/components/forms/order-form/form-schema";
import CustomerInfo from "@/components/layout/customer-info";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const { toast } = useToast();
  const { push, query } = useRouter();
  const { mutate } = api.order.create.useMutation({
    onSuccess: async ({ id }) => {
      toast({
        description: 'Venda criada com sucesso!',
      });

      await push(`/orders/${id}`);
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    }
  });


  const onSubmit = (data: OrderFormFields) => {
    mutate({
      ...data,
      customerId: query.customerid as string,
      axle_left: Number(data.axle_left),
      axle_right: Number(data.axle_right),
      total: Number(data.total),
      dnp_left: Number(data.dnp_left),
      dnp_right: Number(data.dnp_right),
    });
  }


  return (
    <div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4 gap-4">
      <div className="w-full flex flex-row">
        <Link href={`/customers/${query.customerid as string}`}>
          <ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
        </Link>

        <h1 className="text-xl text-center mx-auto">Nova Venda</h1>
      </div>
      <CustomerInfo
        id={query.customerid as string}
      />
      <OrderForm
        onSubmit={onSubmit}
      />
    </div>
  )
}
