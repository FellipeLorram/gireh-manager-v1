import { addCustomerToAppointmentLineInput, addCutomerToAppointmentLine } from './add-customer-to-appointment-line';
import { prismaMock } from '../../test/assets/singleton';

describe('Add Customer to Appointment Line Use Case', () => {
	it('Should be able to add a customer to the appointment Line', async () => {
		const input = addCustomerToAppointmentLineInput.parse({
			customerId: 'customer1',
		});

		await addCutomerToAppointmentLine({ prisma: prismaMock, input });

		expect(prismaMock.customer.update).toHaveBeenCalledWith({
			where: {
				id: input.customerId,
			},
			data: {
				inLine: true,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				entryLineAt: expect.any(Date),
			},
		});
	});
});


