import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";

import { createCustomerInput, createCustomerUseCase } from "@/server/use-cases/customer/create-customer";
import { getCustomerInput, GetCustomerUseCase } from "@/server/use-cases/customer/get-customer";
import { ListCustomerUseCase } from "@/server/use-cases/customer/list-customers";
import { UpdateCustomerUseCase, updateCustomerInput } from "@/server/use-cases/customer/update-customer";
import { addCutomerToAppointmentLine } from "@/server/use-cases/customer/add-customer-to-appointment-line";
import { removeCustomerFromAppointmentLine } from "@/server/use-cases/customer/remove-customer-from-appointment-line";
import { toggleCustomerFromAppointmentLine } from "@/server/use-cases/customer/toggle-customer-from-appointment-line";
import { DeleteCustomerUseCase } from "@/server/use-cases/customer/delete-customer";
import { ListCustomerInAppointmentLineUseCase } from "@/server/use-cases/customer/list-customers-in-appointment-line";
import { SearchCustomerByNameUseCase } from "@/server/use-cases/customer/search-customer-by-name";

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
			await DeleteCustomerUseCase({
				prisma: ctx.db,
				input: {
					id: input.id,
				},
			});
		}),

	listCustomersInLine: protectedProcedure
		.query(async ({ ctx }) => {
			const customers = await ListCustomerInAppointmentLineUseCase({
				prisma: ctx.db,
				orgId: ctx.session.user.orgId,
			});

			return customers;
		}),

	searchByName: protectedProcedure
		.input(z.object({
			name: z.string(),
		})).query(async ({ ctx, input }) => {
			const customers = await SearchCustomerByNameUseCase({
				prisma: ctx.db,
				orgId: ctx.session.user.orgId,
				name: input.name,
			});

			return customers;
		}),

	addToAppointmentLine: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.mutation(async ({ ctx, input }) => {
			await addCutomerToAppointmentLine({
				prisma: ctx.db,
				input: {
					customerId: input.id,
				},
			})
		}),

	removeFromAppointmentLine: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.mutation(async ({ ctx, input }) => {
			await removeCustomerFromAppointmentLine({
				prisma: ctx.db,
				input: {
					customerId: input.id,
				},
			})
		}),

	appoinmentLineToggle: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.mutation(async ({ ctx, input }) => {
			const inLine = await toggleCustomerFromAppointmentLine({
				prisma: ctx.db,
				input: {
					customerId: input.id,
				},
			});

			return inLine;
		})
});
