import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { AppointmentForm, type appointmentFormValues } from "@/components/forms/appointment-form";
import { CentralizedLayout } from "@/components/layout/centralized-layout";
import CustomerInfo from "@/components/layout/customer-info";
import { useToast } from "@/components/ui/use-toast";

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
		<CentralizedLayout>
			<CustomerInfo
				id={query.customerid as string}
			/>
			<AppointmentForm
				onSubmit={onSubmit}
				isLoading={isLoading}
			/>
		</CentralizedLayout>

	)
}