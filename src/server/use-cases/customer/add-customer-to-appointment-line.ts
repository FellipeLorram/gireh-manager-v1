import { type PrismaClient } from '@prisma/client';
import { z } from 'zod';

export const addCustomerToAppointmentLineInput = z.object({
	customerId: z.string(),
});

export async function addCutomerToAppointmentLine({
	prisma,
	input,
}: {
	prisma: PrismaClient;
	input: z.infer<typeof addCustomerToAppointmentLineInput>;
}) {
	await prisma.customer.update({
		where: {
			id: input.customerId,
		},
		data: {
			inLine: true,
			entryLineAt: new Date(),
		},
	});
}
