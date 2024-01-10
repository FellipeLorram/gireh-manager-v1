import { GetCustomerUseCase } from './get-customer';
import { prismaMock } from '../../test/assets/singleton';

describe('GetCustomerUseCase', () => {
	it('should get a customer with phone included', async () => {
		await GetCustomerUseCase({
			prisma: prismaMock,
			input: {
				id: '1',
			},
		});

		expect(prismaMock.customer.findUnique).toHaveBeenCalledWith({
			where: {
				id: '1',
			},
			include: {
				Phone: true,
			},
		});
	});
});
