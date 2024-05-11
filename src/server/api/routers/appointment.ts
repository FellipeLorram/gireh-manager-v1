import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ListAppointmentsUseCase } from "@/server/use-cases/appointments/list-appointments";
import { ListCustomerAppointmentsUseCase } from "@/server/use-cases/appointments/list-customer-appointments";
import { ListAppointmentsByRangeUseCase } from "@/server/use-cases/appointments/list-appointments-by-range";

export const appointmentRouter = createTRPCRouter({
	list: protectedProcedure
		.query(async ({ ctx }) => {
			const appointments = await ListAppointmentsUseCase({
				prisma: ctx.db,
				orgId: ctx.session.user.orgId,
			});

			return appointments;
		}),

	listCustomerAppointments: protectedProcedure
		.input(z.object({
			customerId: z.string(),
		})).query(async ({ ctx, input }) => {
			const appointments = await ListCustomerAppointmentsUseCase({
				customerId: input.customerId,
				orgId: ctx.session.user.orgId,
				prisma: ctx.db,
			})

			return appointments;
		}),

	listAppointmentsByRange: protectedProcedure
		.input(z.object({
			startDate: z.string().or(z.date()),
			endDate: z.string().or(z.date()),
		})).query(async ({ ctx, input }) => {
			const appointments = await ListAppointmentsByRangeUseCase({
				prisma: ctx.db,
				orgId: ctx.session.user.orgId,
				startDate: input.startDate,
				endDate: input.endDate,
			});

			return appointments;
		}),


	create: protectedProcedure
		.input(z.object({
			customerId: z.string(),
			esf_right: z.string().optional(),
			cil_right: z.string().optional(),
			axle_right: z.number().optional(),
			esf_left: z.string().optional(),
			cil_left: z.string().optional(),
			axle_left: z.number().optional(),
			add: z.string().optional(),
			anamnesis: z.string().optional(),
			observations: z.string().optional(),
		})).mutation(async ({ ctx, input }) => {
			const { name } = await ctx.db.customer.findFirstOrThrow({
				where: {
					id: input.customerId,
				},
			});

			const appointment = await ctx.db.appointment.create({
				data: {
					orgId: ctx.session.user.orgId,
					customerId: input.customerId,
					esf_right: input.esf_right,
					cil_right: input.cil_right,
					axle_right: input.axle_right,
					esf_left: input.esf_left,
					cil_left: input.cil_left,
					axle_left: input.axle_left,
					add: input.add,
					anamnesis: input.anamnesis,
					observation: input.observations,
					customerName: name,
				},
			});

			await ctx.db.customer.update({
				where: {
					id: input.customerId,
				},
				data: {
					inLine: false,
				},
			});

			return appointment;
		}),

	get: protectedProcedure
		.input(z.object({
			id: z.string(),
		})).query(async ({ ctx, input }) => {
			const appointment = await ctx.db.appointment.findFirstOrThrow({
				where: {
					id: input.id,
				},
			});

			return appointment;
		}),

	update: protectedProcedure
		.input(z.object({
			id: z.string(),
			esf_right: z.string().optional(),
			cil_right: z.string().optional(),
			axle_right: z.number().optional(),
			esf_left: z.string().optional(),
			cil_left: z.string().optional(),
			axle_left: z.number().optional(),
			add: z.string().optional(),
			anamnesis: z.string().optional(),
			observations: z.string().optional(),
		})).mutation(async ({ ctx, input }) => {
			const appointment = await ctx.db.appointment.update({
				where: {
					id: input.id,
				},
				data: {
					esf_right: input.esf_right,
					cil_right: input.cil_right,
					axle_right: input.axle_right,
					esf_left: input.esf_left,
					cil_left: input.cil_left,
					axle_left: input.axle_left,
					add: input.add,
					anamnesis: input.anamnesis,
					observation: input.observations,
				},
			});

			return appointment;
		}),

		getLastCustomerAppointment: protectedProcedure
		.input(z.object({
			customerId: z.string(),
		})).query(async ({ ctx, input }) => {
			const appointment = await ctx.db.appointment.findFirst({
				where: {
					customerId: input.customerId,
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			return appointment;
		}),
});
