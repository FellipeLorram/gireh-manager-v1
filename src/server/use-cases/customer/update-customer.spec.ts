import { UpdateCustomerUseCase } from './update-customer';
import { prismaMock } from '../../test/assets/singleton';

describe('UpdateCustomerUseCase', () => {
	it('should update a customer', async () => {
		const input = {
			id: 'customer-id',
			name: 'customer-name',
			orgId: 'org-id',
			address: 'customer-address',
			birthDate: '2000-01-01',
			inLine: false,
			phone: [{
				id: 'phone-id',
				number: 'phone-number',
			}],
		};

		const createdAt = new Date();
		const age = new Date().getFullYear() - new Date('2000-01-01').getFullYear();

		prismaMock.customer.update.mockResolvedValue({
			id: 'customer-id',
			name: 'customer-name',
			createdAt,
			address: 'customer-address',
			inLine: false,
			birthDate: new Date('2000-01-01'),
			age,
			orgId: 'org-id',
			entryLineAt: null,
		});

		const result = await UpdateCustomerUseCase({
			prisma: prismaMock,
			input,
		});

		expect(result).toEqual({
			id: 'customer-id',
			name: 'customer-name',
			createdAt, 
			address: 'customer-address',
			inLine: false,
			birthDate: new Date('2000-01-01'),
			entryLineAt: null,
			age,
			orgId: 'org-id',
		});

		expect(prismaMock.customer.update).toHaveBeenCalledWith({
			where: {
				id: input.id,
			},
			data: {
				name: input.name,
				address: input.address,
				inLine: input.inLine,
				age: new Date().getFullYear() - new Date('2000-01-01').getFullYear(),
				birthDate: new Date(input.birthDate),
				Phone: {
					upsert: input.phone.map((p) => ({
						where: {
							id: p.id,
						},
						create: {
							number: p.number,
						},
						update: {
							number: p.number,
						},
					})),
				},
			},
		});

		expect(prismaMock.phone.deleteMany).toHaveBeenCalledWith({
			where: {
				id: {
					notIn: input.phone.map((p) => p.id),
				},
				customerId: input.id,
			},
		});
	});
});
