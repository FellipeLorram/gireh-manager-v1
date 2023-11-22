import { AppointmentForm, type appointmentFormValues } from "@/components/forms/appointment-form";
import CustomerInfo from "@/components/layout/customer-info";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
	const { toast } = useToast();
	const { push, query } = useRouter();
	const { mutate, isLoading } = api.appointment.create.useMutation({
		onSuccess: async () => {
			toast({
				description: 'Consulta criada com sucesso!',
			});

			await push(`/appointments`);
		},
		onError: (error) => {
			toast({
				description: error.message,
			});
		}
	});

	const onSubmit = (data: appointmentFormValues) => {
		mutate({
		  ...data,
		  customerId: query.customerid as string,
		  axle_left: Number(data.axle_left),
		  axle_right: Number(data.axle_right),
		});
	}

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4 gap-4">
			<div className="w-full flex flex-row">
				<Link href={`/appointments`}>
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl text-center mx-auto">Nova Consulta</h1>
			</div>
			<CustomerInfo
				id={query.customerid as string}
			/>
			<AppointmentForm
				onSubmit={onSubmit}
				isLoading={isLoading}
			/>
		</div>
	)
}