import { ListCustomerUseCase } from './list-customers';
import { prismaMock } from '../../test/assets/singleton';

describe('ListCustomerUseCase', () => {
	it('should list customers', async () => {
		const orgId = 'org-id';

		prismaMock.customer.findMany.mockResolvedValue([]);

		const result = await ListCustomerUseCase({
			prisma: prismaMock,
			orgId,
		});

		expect(result).toEqual([]);
		expect(prismaMock.customer.findMany).toHaveBeenCalledWith({
			where: {
				orgId,
			},
			orderBy: {
				name: 'asc',
			},
		});
	});
});
