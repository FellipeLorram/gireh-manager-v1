import { useForm } from "react-hook-form"
import { type OrderFormFields, OrderFormSchema } from "./form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import { AppointmentDetails } from "./appointment-details";
import { MeasuresDetails } from "./measures-details";
import { Frames } from "./frames";
import { Lenses } from "./lenses";
import { Total } from "./total";
import { OthersFields } from "./others-fields";

interface Props {
  onSubmit: (data: OrderFormFields) => void;
  defaultValues?: OrderFormFields;
  SubmitButton: React.ReactNode;
}

export function OrderForm({ onSubmit, defaultValues, SubmitButton }: Props) {
  const form = useForm<OrderFormFields>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: defaultValues ?? {
      esf_right: '-0.00',
      cil_right: '-0.00',
      axle_right: '0',
      esf_left: '-0.00',
      cil_left: '-0.00',
      axle_left: '0',
      add: '+0.00',
      dnp_right: '0',
      dnp_left: '0',
      frame: [],
      lenses: [],
      observation: '',
      total: 0,
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <AppointmentDetails form={form} />
        <MeasuresDetails form={form} />
        <Frames form={form} />
        <Lenses form={form} />
        <Total form={form} />
        <OthersFields form={form} />
        {SubmitButton}
      </form>
    </Form>
  )
}
