import { type PrismaClient } from "@prisma/client";

export async function ListAppointmentsByRangeUseCase({ 
	prisma, 
	orgId, 
	startDate,
	endDate
}: {
	prisma: PrismaClient;
	orgId: string;
	startDate: string | Date;
	endDate: string | Date;
}) {
	const appointments = await prisma.appointment.findMany({
		where: {
			orgId: orgId,
			createdAt: {
				gte: new Date(startDate),
				lte: new Date(endDate),
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return appointments; 
}
