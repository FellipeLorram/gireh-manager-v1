import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const appointmentRouter = createTRPCRouter({
	list: protectedProcedure
		.query(({ ctx }) => {
			const appointments = ctx.db.appointment.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
			});

			return appointments;
		}),

	listCustomerAppointments: protectedProcedure
		.input(z.object({
			customerId: z.string(),
		})).query(async ({ ctx, input }) => {
			const appointments = await ctx.db.appointment.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					customerId: input.customerId,
				},
			});

			return appointments;
		}),

	listAppointmentsByRange: protectedProcedure
		.input(z.object({
			startDate: z.string().or(z.date()),
			endDate: z.string().or(z.date()),
		})).query(async ({ ctx, input }) => {
			const appointments = await ctx.db.appointment.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					createdAt: {
						gte: new Date(input.startDate),
						lte: new Date(input.endDate),
					},
				},
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
});
