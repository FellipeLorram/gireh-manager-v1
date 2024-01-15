import { listCustomerOrdersUseCase } from './list-customer-orders';
import { prismaMock } from '../../test/assets/singleton';

describe('listCustomerOrdersUseCase', () => {
	it('should list customer orders', async () => {
		const input = {
			customerId: 'customer-id',
			orgId: 'org-id',
		};

		prismaMock.order.findMany.mockResolvedValue([]);

		const result = await listCustomerOrdersUseCase({
			prisma: prismaMock,
			input,
		});

		expect(result).toEqual([]);
		expect(prismaMock.order.findMany).toHaveBeenCalledWith({
			where: {
				customerId: input.customerId,
				orgId: input.orgId,
			},
		});
	});
});

