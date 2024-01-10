import { type PrismaClient } from "@prisma/client";
import { z } from "zod";

export const getCustomerInput = z.object({
	id: z.string(),
});

export function GetCustomerUseCase({ prisma, input}: {
	prisma: PrismaClient;
	input: z.infer<typeof getCustomerInput>;
}) {
	return prisma.customer.findUnique({
		where: {
			id: input.id,
		},
		include: {
			Phone: true,
		}
	});
}