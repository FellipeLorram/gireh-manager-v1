import { type PrismaClient } from '@prisma/client';
import { z } from 'zod';

export const listCustomerOrdersInput = z.object({
	customerId: z.string(),
	orgId: z.string(),
});

export type ListCustomerOrdersInput = z.infer<typeof listCustomerOrdersInput>;

export function listCustomerOrdersUseCase({
	prisma,
	input,
}: {
	prisma: PrismaClient;
	input: ListCustomerOrdersInput;
}) {
	return prisma.order.findMany({
		where: {
			customerId: input.customerId,
			orgId: input.orgId,
		},
	});
}
