import type { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const toggleCustomerFromAppointmentLineInput = z.object({
	customerId: z.string(),
});

export async function toggleCustomerFromAppointmentLine({ prisma, input }: {
	prisma: PrismaClient;
	input: z.infer<typeof toggleCustomerFromAppointmentLineInput>;
}) {
	const customer = await prisma.customer.findUniqueOrThrow({
		where: {
			id: input.customerId,
		},
	});

	const inLine = !customer.inLine;
	const entryLineAt = inLine ? new Date() : null;

	await prisma.customer.update({
		where: {
			id: input.customerId,
		},
		data: {
			inLine,
			entryLineAt,
		},
	});

	return {
		inLine,
	};
}