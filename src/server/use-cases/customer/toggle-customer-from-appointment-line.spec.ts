import { prismaMock } from '../../test/assets/singleton';
import { toggleCustomerFromAppointmentLine, toggleCustomerFromAppointmentLineInput } from './toggle-customer-from-appointment-line';

describe('Toggle Customer from Appointment Line Use Case', () => {
	it('should toggle the inLine status and update entryLineAt accordingly', async () => {
		const mockCustomer = {
			id: "1",
			address: "1234 Main St",
			createdAt: new Date(),
			age: 30,
			name: "John",
			birthDate: new Date(),
			entryLineAt: null,
			inLine: false,
			orgId: "1",
		};

		const input = toggleCustomerFromAppointmentLineInput.parse({
			customerId: '1',
		});
		
		prismaMock.customer.findUniqueOrThrow.mockResolvedValue(mockCustomer);

		const result = await toggleCustomerFromAppointmentLine({ prisma: prismaMock, input });

		expect(prismaMock.customer.findUniqueOrThrow).toHaveBeenCalledWith({
			where: {
				id: input.customerId,
			},
		});

		expect(result.inLine).toBe(true);

		prismaMock.customer.findUniqueOrThrow.mockResolvedValue({ ...mockCustomer, inLine: true, entryLineAt: new Date() });

		const result2 = await toggleCustomerFromAppointmentLine({
			prisma: prismaMock,
			input: {
				customerId: '1',
			}
		});

		expect(result2.inLine).toBe(false);
		expect(prismaMock.customer.update).toHaveBeenCalledWith({
			where: { id: mockCustomer.id },
			data: { inLine: false, entryLineAt: null },
		});
	});
});
