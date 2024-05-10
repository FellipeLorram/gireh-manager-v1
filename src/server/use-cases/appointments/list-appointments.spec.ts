import { prismaMock } from '../../test/assets/singleton';
import { ListAppointmentsUseCase } from './list-appointments';

describe('ListAppointmentsUseCase', () => {
	it('should list appointments', async () => {
		const orgId = 'org-id';

		prismaMock.appointment.findMany.mockResolvedValue([]);

		const result = await ListAppointmentsUseCase({
			prisma: prismaMock,
			orgId,
		});

		expect(result).toEqual([]);
		expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
			where: {
				orgId,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	});
});