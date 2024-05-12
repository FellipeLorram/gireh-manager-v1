import { type PrismaClient } from "@prisma/client";
import { z } from "zod";

export const deleteCustomerInput = z.object({
	id: z.string(),
});

export function DeleteCustomerUseCase({ prisma, input}: {
	prisma: PrismaClient;
	input: z.infer<typeof deleteCustomerInput>;
}) {
	return prisma.customer.delete({
		where: {
			id: input.id,
		},
	});
}