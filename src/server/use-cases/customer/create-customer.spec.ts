import { createCustomerInput, createCustomerUseCase } from './create-customer';
import { prismaMock } from '../../test/assets/singleton';

describe('Create Customer Use Case', () => {
	it('should create a customer with phone', async () => {
		const input = createCustomerInput.parse({
			name: 'John Doe',
			phone: [{ number: '1234567890' }],
			address: '123 Main St',
			inLine: false,
			birthDate: '2000-01-01',
			orgId: 'org1',
		});

		await createCustomerUseCase({ prisma: prismaMock, input });

		expect(prismaMock.customer.create).toHaveBeenCalledWith({
			data: {
				birthDate: new Date('2000-01-01'),
				name: input.name,
				address: input.address,
				age: new Date().getFullYear() - new Date('2000-01-01').getFullYear(),
				inLine: input.inLine,
				orgId: input.orgId,
				entryLineAt: input.inLine ? new Date() : null,
				Phone: {
					create: input.phone?.map((phone) => ({
						number: phone.number,
					})),
				},
			},
		});
	});
});


