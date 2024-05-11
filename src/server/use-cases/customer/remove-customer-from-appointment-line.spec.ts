import { prismaMock } from '../../test/assets/singleton';
import { removeCustomerFromAppointmentLine, removeCustomerFromAppointmentLineInput } from './remove-customer-from-appointment-line';

describe('Remove Customer to Appointment Line Use Case', () => {
	it('Should be able to remove a customer from the appointment Line', async () => {
		const input = removeCustomerFromAppointmentLineInput.parse({
			customerId: 'customer1',
		});

		await removeCustomerFromAppointmentLine({ prisma: prismaMock, input });

		expect(prismaMock.customer.update).toHaveBeenCalledWith({
			where: {
				id: input.customerId,
			},
			data: {
				inLine: false,
				entryLineAt: null,
			},
		});
	});
});


