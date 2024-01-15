import { UpdateCustomerUseCase } from './update-customer';
import { prismaMock } from '../../test/assets/singleton';

describe('UpdateCustomerUseCase', () => {
	it('should update a customer', async () => {
		const input = {
			id: 'customer-id',
			name: 'customer-name',
			orgId: 'org-id',
			address: 'customer-address',
			inLine: false,
			Phones: [{
				id: 'phone-id',
				number: 'phone-number',
			}],
		};

		const createdAt = new Date();
		const birthDate = new Date('2000-01-01');
		const age = new Date().getFullYear() - new Date('2000-01-01').getFullYear();

		prismaMock.customer.update.mockResolvedValue({
			id: 'customer-id',
			name: 'customer-name',
			createdAt,
			address: 'customer-address',
			inLine: false,
			birthDate,
			age,
			orgId: 'org-id',
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
			birthDate,
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
				age,
				birthDate, 
				Phone: {
					upsert: input.Phones?.map((phone) => ({
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
				},
			},
		});

		expect(prismaMock.phone.deleteMany).toHaveBeenCalledWith({
			where: {
				id: {
					notIn: input.Phones?.map((phone) => phone.id),
				},
				customerId: input.id,
			},
		});
	});
});
