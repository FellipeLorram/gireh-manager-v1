import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";

export const CustomerRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({
			name: z.string().min(3, 'Nome inválido'),
			phone: z.array(z.object({
				number: z.string(),
			})).optional(),
			age: z.number().optional(),
			address: z.string().optional(),
			inLine: z.boolean().optional(),
		}))
		.mutation(({ ctx, input }) => {
			const customer = ctx.db.customer.create({
				data: {
					name: input.name,
					address: input.address,
					age: input.age,
					inLine: input.inLine,
					orgId: ctx.session.user.orgId,
					Phone: {
						create: input.phone?.map((phone) => ({
							number: phone.number,
						})),
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
				include: {
					Phone: true,
				}
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
			phone: z.array(z.object({
				number: z.string(),
				id: z.string(),
			})).optional(),
			age: z.number().optional(),
			address: z.string().optional(),
			inLine: z.boolean().optional(),
		}))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.phone.deleteMany({
				where: {
					id: {
						notIn: input.phone?.map((phone) => phone.id),
					},
				},
			});

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
						upsert: input.phone?.map((phone) => ({
							where: {
								id: phone.id,
							},
							create: {
								number: phone.number,
							},
							update: {
								number: phone.number,
							},
						})),
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

	listCustomersInLine: protectedProcedure
		.query(({ ctx }) => {
			const customers = ctx.db.customer.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					inLine: true,
				},
				orderBy: {
					name: "asc",
				},
			});

			return customers;
		}),
});
