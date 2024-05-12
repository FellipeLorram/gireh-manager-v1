import { type PrismaClient } from "@prisma/client"; 

export function SearchCustomerByNameUseCase({ prisma, orgId, name }: {
	prisma: PrismaClient;
	orgId: string;
	name: string;
}) {
	return prisma.customer.findMany({
		where: {
			orgId,
			name: {
				startsWith: name,
			},
		},
		take: 2,
		orderBy: {
			name: "asc",
		},
		include: {
			Phone: true,
		}
	});
}
