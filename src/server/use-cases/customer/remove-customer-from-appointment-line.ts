import { type PrismaClient } from '@prisma/client';
import { z } from 'zod';

export const removeCustomerFromAppointmentLineInput = z.object({
	customerId: z.string(),
});

export async function removeCustomerFromAppointmentLine({
	prisma,
	input,
}: {
	prisma: PrismaClient;
	input: z.infer<typeof removeCustomerFromAppointmentLineInput>;
}) {
	await prisma.customer.update({
		where: {
			id: input.customerId,
		},
		data: {
			inLine: false,
			entryLineAt: null,
		},
	});
}
