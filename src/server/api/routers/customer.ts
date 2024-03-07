import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";

import { createCustomerInput, createCustomerUseCase } from "@/server/use-cases/customer/create-customer";
import { getCustomerInput, GetCustomerUseCase } from "@/server/use-cases/customer/get-customer";
import { ListCustomerUseCase } from "@/server/use-cases/customer/list-customers";
import { UpdateCustomerUseCase, updateCustomerInput } from "@/server/use-cases/customer/update-customer";

export const CustomerRouter = createTRPCRouter({
	create: protectedProcedure
		.input(createCustomerInput.omit({ orgId: true }))
		.mutation(({ ctx, input }) => {
			return createCustomerUseCase({
				prisma: ctx.db,
				input: {
					...input,
					orgId: ctx.session.user.orgId,
				},
			})
		}),

	get: protectedProcedure
		.input(getCustomerInput)
		.query(async ({ ctx, input }) => {
			return GetCustomerUseCase({
				prisma: ctx.db,
				input: input,
			});
		}),

	list: protectedProcedure
		.query(({ ctx }) => {
			return ListCustomerUseCase({
				prisma: ctx.db,
				orgId: ctx.session.user.orgId,
			});
		}),

	update: protectedProcedure
		.input(updateCustomerInput)
		.mutation(async ({ ctx, input }) => {
			return UpdateCustomerUseCase({
				prisma: ctx.db,
				input: input,
			});
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
					entryLineAt: "asc",
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

		addToAppointmentLine: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.customer.update({
				where: {
					id: input.id,
				},
				data: {
					inLine: true,
					entryLineAt: new Date(),
				},
			});
		}),

		removeFromAppointmentLine: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.customer.update({
				where: {
					id: input.id,
				},
				data: {
					inLine: false,
					entryLineAt: null,
				},
			});
		}),

		appoinmentLineToggle: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.mutation(async ({ ctx, input }) => {
			const customer = await ctx.db.customer.findUniqueOrThrow({
				where: {
					id: input.id,
				},
			});

			if (customer.inLine) {
				await ctx.db.customer.update({
					where: {
						id: input.id,
					},
					data: {
						inLine: false,
						entryLineAt: null,
					},
				});
			} else {
				await ctx.db.customer.update({
					where: {
						id: input.id,
					},
					data: {
						inLine: true,
						entryLineAt: new Date(),
					},
				});
			}

			return {
				inLine: !customer.inLine,
			};
		}),
});
