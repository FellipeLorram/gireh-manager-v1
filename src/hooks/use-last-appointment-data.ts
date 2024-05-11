import { api } from "@/utils/api";

interface Props {
	customerId: string;
}

export function useLastAppointmentData({ customerId }: Props) {
	return api.appointment.getLastCustomerAppointment.useQuery({
		customerId,
	});
}
