import { type PrismaClient } from "@prisma/client";

export async function ListAppointmentsUseCase({ prisma, orgId }: {
	prisma: PrismaClient;
	orgId: string;
}) {
	const appointments = await prisma.appointment.findMany({
		where: {
			orgId: orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return appointments; 
}
