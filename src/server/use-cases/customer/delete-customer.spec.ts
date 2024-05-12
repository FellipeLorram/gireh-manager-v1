import { DeleteCustomerUseCase } from './delete-customer';
import { prismaMock } from '../../test/assets/singleton';

describe('DeleteCustomerUseCase', () => {
	it('should Delete a customer with phone included', async () => {
		await DeleteCustomerUseCase({
			prisma: prismaMock,
			input: {
				id: '1',
			},
		});

		expect(prismaMock.customer.findUnique).toHaveBeenCalledWith({
			where: {
				id: '1',
			},
		});
	});
});
