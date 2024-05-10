import { prismaMock } from '../../test/assets/singleton';
import { ListAppointmentsByRangeUseCase } from './list-appointments-by-range';

describe('ListAppointmentsByRangeUseCase', () => {
	it('should list appointments', async () => {
		const orgId = 'org-id';
		const startDate = new Date();
		const endDate = new Date();

		prismaMock.appointment.findMany.mockResolvedValue([]);

		const result = await ListAppointmentsByRangeUseCase({
			prisma: prismaMock,
			orgId,
			startDate,
			endDate,
		});

		expect(result).toEqual([]);
		expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
			where: {
				orgId,
				createdAt: {
					gte: startDate,
					lte: endDate,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	});
});