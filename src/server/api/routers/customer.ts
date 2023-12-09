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
			address: z.string().optional(),
			inLine: z.boolean().optional(),
			birthDate: z.string().optional(),
		}))
		.mutation(({ ctx, input }) => {
			const age = input.birthDate ? new Date().getFullYear() - new Date(input.birthDate).getFullYear() : null;
			const bd = input.birthDate ? new Date(input.birthDate) : null;
			const customer = ctx.db.customer.create({
				data: {
					name: input.name,
					address: input.address,
					age: age,
					inLine: input.inLine,
					orgId: ctx.session.user.orgId,
					birthDate: bd,
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
		.query(async ({ ctx, input }) => {
			const customer = await ctx.db.customer.findUnique({
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
			address: z.string().optional(),
			inLine: z.boolean().optional(),
			birthDate: z.string().optional(),
		}))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.phone.deleteMany({
				where: {
					id: {
						notIn: input.phone?.map((phone) => phone.id),
					},
					customerId: input.id,
				},
			});

			const birthDate = input.birthDate ? new Date(input.birthDate) : null;
			const age = input.birthDate ? new Date().getFullYear() - new Date(input.birthDate).getFullYear() : null;
			
			const customer = ctx.db.customer.update({
				where: {
					id: input.id,
				},
				data: {
					birthDate: birthDate,
					name: input.name,
					address: input.address,
					age: age,
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

	searchByName: protectedProcedure
		.input(z.object({
			name: z.string(),
		})).query(({ ctx, input }) => {
			const customers = ctx.db.customer.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					name: {
						startsWith: input.name,
					},
				},
				take: 2,
				orderBy: {
					name: "asc",
				},
				include: {
					Phone: true,
				}
			});

			return customers;
		}),
});
