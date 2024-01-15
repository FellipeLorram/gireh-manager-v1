import { type PrismaClient } from "@prisma/client";
import { z } from "zod";

export const updateCustomerInput = z.object({
	id: z.string(),
	name: z.string().optional(),
	phone: z.array(z.object({
		number: z.string(),
		id: z.string(),
	})).optional(),
	address: z.string().optional(),
	inLine: z.boolean().optional(),
	birthDate: z.string().optional(),
});

export async function UpdateCustomerUseCase({ prisma, input }: {
	prisma: PrismaClient;
	input: z.infer<typeof updateCustomerInput>;
}) {
	await prisma.phone.deleteMany({
		where: {
			id: {
				notIn: input.phone?.map((phone) => phone.id),
			},
			customerId: input.id,
		},
	});

	const birthDate = input.birthDate ? new Date(input.birthDate) : null;
	const age = input.birthDate ? new Date().getFullYear() - new Date(input.birthDate).getFullYear() : null;

	const customer = prisma.customer.update({
		where: {
			id: input.id,
		},
		data: {
			birthDate: birthDate,
			name: input.name,
			address: input.address,
			age: age,
			inLine: input.inLine,
			Phone: {
				upsert: input.phone?.map((phone) => ({
					where: {
						id: phone.id,
					},
					create: {
						number: phone.number,
					},
					update: {
						number: phone.number,
					},
				})),
			}
		},
	});

	return customer;
}