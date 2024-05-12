import { type PrismaClient } from "@prisma/client";

export async function ListCustomerInAppointmentLineUseCase({ prisma, orgId }: {
	prisma: PrismaClient;
	orgId: string;
}) {
	return await prisma.customer.findMany({
		where: {
			orgId: orgId,
			inLine: true,
		},
		orderBy: {
			entryLineAt: "asc",
		},
	});
}
