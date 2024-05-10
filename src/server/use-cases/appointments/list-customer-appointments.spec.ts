import { prismaMock } from '../../test/assets/singleton';
import { ListCustomerAppointmentsUseCase } from './list-customer-appointments';

describe('ListCustomerAppointmentsUseCase', () => {
	it('should list appointments', async () => {
		const orgId = 'org-id';
		const customerId = 'customer-id';

		prismaMock.appointment.findMany.mockResolvedValue([]);

		const result = await ListCustomerAppointmentsUseCase({
			prisma: prismaMock,
			orgId,
			customerId,
		});

		expect(result).toEqual([]);
		expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
			where: {
				orgId,
				customerId,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	});
});