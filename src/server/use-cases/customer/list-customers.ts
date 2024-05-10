import { type PrismaClient } from "@prisma/client";

export function ListCustomerUseCase({ prisma, orgId }: {
	prisma: PrismaClient;
	orgId: string;
}) {
	return prisma.customer.findMany({
		where: {
			orgId: orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}
