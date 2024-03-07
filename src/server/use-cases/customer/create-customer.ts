import { type PrismaClient } from '@prisma/client';
import { z } from 'zod';

export const createCustomerInput = z.object({
	name: z.string().min(3, 'Nome inválido'),
	phone: z.array(z.object({
		number: z.string(),
	})).optional(),
	address: z.string().optional(),
	inLine: z.boolean().optional(),
	birthDate: z.string().optional(),
	orgId: z.string(),
});

export async function createCustomerUseCase({
	prisma,
	input,
}: {
	prisma: PrismaClient;
	input: z.infer<typeof createCustomerInput>;
}) {
	const birthDate = input.birthDate ? new Date(input.birthDate) : null;
	const age = input.birthDate ? new Date().getFullYear() - new Date(input.birthDate).getFullYear() : null;

	const customer = await prisma.customer.create({
		data: {
			birthDate: birthDate,
			name: input.name,
			address: input.address,
			age: age,
			inLine: input.inLine,
			entryLineAt: input.inLine ? new Date() : null,
			orgId: input.orgId,
			Phone: {
				create: input.phone?.map((phone) => ({
					number: phone.number,
				})),
			},
		},
	});

	return customer;
}
