import { prismaMock } from '../../test/assets/singleton';
import { toggleCustomerFromAppointmentLine, toggleCustomerFromAppointmentLineInput } from './toggle-customer-from-appointment-line';

describe('Toggle Customer from Appointment Line Use Case', () => {
	it('Should be able to toggle a customer from the appointment Line', async () => {
		const input = toggleCustomerFromAppointmentLineInput.parse({
			customerId: 'customer1',
		});

		await toggleCustomerFromAppointmentLine({ prisma: prismaMock, input });

		expect(prismaMock.customer.findUniqueOrThrow).toHaveBeenCalledWith({
			where: {
				id: input.customerId,
			},
		});




	});
});


