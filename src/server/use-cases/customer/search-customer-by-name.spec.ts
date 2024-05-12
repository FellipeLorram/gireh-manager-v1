import { prismaMock } from '../../test/assets/singleton';
import { SearchCustomerByNameUseCase } from './search-customer-by-name';

describe('SearchCustomerByNameUseCase', () => {
	it('Should be able to search a customer through its name', async () => {
		await SearchCustomerByNameUseCase({ 
			prisma: prismaMock, 
			orgId: 'org1',
			name: 'name1', 
		});

		expect(prismaMock.customer.findMany).toHaveBeenCalledWith({
			where: {
				orgId: 'org1',
				name: {
					startsWith: 'name1',
				},
			},
			take: 2,
			orderBy: {
				name: "asc",
			},
			include: {
				Phone: true,
			}
		});
	});
});


