import { useForm } from "react-hook-form"
import { type OrderFormFields, OrderFormSchema } from "./form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { AppointmentDetails } from "./appointment-details";
import { MeasuresDetails } from "./measures-details";
import { Frames } from "./frames";
import { Lenses } from "./lenses";

export function OrderForm() {
  const form = useForm<OrderFormFields>({
    resolver: zodResolver(OrderFormSchema),
  });

  return (
    <Form {...form}>
      <form className="w-full">
        <AppointmentDetails form={form} />
        <MeasuresDetails form={form} />
        <Frames form={form} />
        <Lenses form={form} />
      </form>
    </Form>
  )
}
