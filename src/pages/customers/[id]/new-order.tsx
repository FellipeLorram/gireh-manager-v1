import { CustomerForm, type CustomerFormSchema } from "@/components/forms/customer-form";
import { OrderForm } from "@/components/forms/order-form";
import CustomerInfo from "@/components/layout/customer-info";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const { toast } = useToast();
  const { push } = useRouter();
  const { mutate } = api.customer.create.useMutation({
    onSuccess: ({ inLine }) => {
      toast({
        description: 'Cliente cadastrado com sucesso',
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    }
  });


  const onSubmit = (data: CustomerFormSchema) => {
    mutate({
      ...data,
      age: Number(data.age),
    });
  }

  return (
    <div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4 gap-4">
      <div className="w-full flex flex-row">
        <Link href="/">
          <ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
        </Link>

        <h1 className="text-xl font-bold text-center mx-auto">Nova Venda</h1>
      </div>
      <CustomerInfo />
      <OrderForm />
    </div>
  )
}
