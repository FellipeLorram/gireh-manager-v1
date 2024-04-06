import { CircleDashed } from "lucide-react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { OrderForm } from "@/components/forms/order-form";
import { type OrderFormFields } from "@/components/forms/order-form/form-schema";
import { CentralizedLayout } from "@/components/layout/centralized-layout";
import CustomerInfo from "@/components/layout/customer/customer-info";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { toast } = useToast();
  const { push, query } = useRouter();

  const { mutate, isLoading } = api.order.create.useMutation({
    onSuccess: async ({ id }) => {
      toast({
        description: 'Venda criada com sucesso!',
      });

      await push(`/orders/${id}/payments/new`);
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    }
  });

  const { data: appointment, isLoading: isAppointmentLoading } = api.appointment.get.useQuery({
    id: query.appointmentid as string,
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
    <CentralizedLayout>
      <CustomerInfo
        id={query.customerid as string}
      />
      <div className="w-full mt-4">
        {isAppointmentLoading ? (
          <CircleDashed className="animate-spin" size={16} />
        ) : (
          <OrderForm
            onSubmit={onSubmit}
            defaultValues={{
              esf_right: appointment?.esf_right ?? '-0.00',
              cil_right: appointment?.cil_right ?? '-0.00',
              axle_right: appointment?.axle_right?.toString() ?? '0',
              esf_left: appointment?.esf_left ?? '-0.00',
              cil_left: appointment?.cil_left ?? '-0.00',
              axle_left: appointment?.axle_left?.toString() ?? '0',
              add: appointment?.add ?? '+0.00',
              dnp_right: '0',
              dnp_left: '0',
              frame: [],
              lenses: [],
              observation: '',
              total: 0,
            }}
            SubmitButton={
              <Button
                disabled={isLoading}
                className="w-full mt-4"
                type="submit"
              >
                {isLoading ? (
                  <CircleDashed className="animate-spin" size={16} />
                ) : "Finalizar Adicionar Pagamento"}
              </Button>
            }
          />
        )}

      </div>
    </CentralizedLayout>
  )
}
