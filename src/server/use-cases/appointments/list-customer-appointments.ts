import { type PrismaClient } from "@prisma/client";

export async function ListCustomerAppointmentsUseCase({ prisma, orgId, customerId }: {
	prisma: PrismaClient;
	orgId: string;
	customerId: string;
}) {
	const appointments = await prisma.appointment.findMany({
		where: {
			orgId: orgId,
			customerId: customerId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return appointments; 
}
