import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";

export const CustomerRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({
			name: z.string().min(3, 'Nome inválido'),
			phone: z.array(z.string().optional().default("")).optional(),
			age: z.number().optional(),
			address: z.string().optional(),
			inLine: z.boolean().optional(),
		}))
		.mutation(({ ctx, input }) => {
			const phones = input.phone?.map((phone) => ({ number: phone }));

			const customer = ctx.db.customer.create({
				data: {
					name: input.name,
					address: input.address,
					age: input.age,
					inLine: input.inLine,
					orgId: ctx.session.user.orgId,
					Phone: {
						create: phones ?? [],
					}
				},
			});

			return customer;
		}),

	get: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.query(({ ctx, input }) => {
			const customer = ctx.db.customer.findUnique({
				where: {
					id: input.id,
				},
			});

			return customer;
		}),

	list: protectedProcedure
		.query(({ ctx }) => {
			const customers = ctx.db.customer.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
				orderBy: {
					name: "asc",
				},
			});

			return customers;
		}),

	update: protectedProcedure
		.input(z.object({
			id: z.string(),
			name: z.string().optional(),
			phone: z.array(z.string().optional().default("")).optional(),
			age: z.number().optional(),
			address: z.string().optional(),
			inLine: z.boolean().optional(),
		}))
		.mutation(({ ctx, input }) => {
			const phones = input.phone?.map((phone) => ({ number: phone }));

			const customer = ctx.db.customer.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					address: input.address,
					age: input.age,
					inLine: input.inLine,
					Phone: {
						upsert: phones?.map((phone) => ({
							where: {
								number: phone.number,
							},
							create: phone,
							update: phone,
						})) ?? [],
					}
				},
			});

			return customer;
		}),

	delete: protectedProcedure.
		input(z.object({
			id: z.string(),
		}))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.customer.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
