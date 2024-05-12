import { ListCustomerInAppointmentLineUseCase } from './list-customers-in-appointment-line';
import { prismaMock } from '../../test/assets/singleton';

describe('ListCustomerInAppointmentLineUseCase', () => {
	it('should list customers in appointment line', async () => {
		const orgId = 'org-id';

		prismaMock.customer.findMany.mockResolvedValue([]);

		const result = await ListCustomerInAppointmentLineUseCase({
			prisma: prismaMock,
			orgId,
		});

		expect(result).toEqual([]);
		expect(prismaMock.customer.findMany).toHaveBeenCalledWith({
			where: {
				orgId,
				inLine: true,
			},
			orderBy: {
				entryLineAt: "asc",
			},
		});
	});
});
