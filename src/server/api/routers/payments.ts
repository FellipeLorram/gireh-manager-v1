import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";

export const paymentsRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({
			amount: z.number().min(1),
			type: z.enum([
				"debit_card",
				"credit_card",
				"pix",
				"money"
			]),
			installments: z.number().min(1),
			orderId: z.string(),
		})).mutation(async ({ ctx, input }) => {
			const { rest, running_credit } = await ctx.db.order.findUniqueOrThrow({
				where: {
					id: input.orderId,
				},
			});

			if (rest < input.amount) {
				throw new Error("Valor da parcela maior que o valor restante");
			}

			const statusIsPaid = rest - input.amount === 0;
			const continueRunningCredit = statusIsPaid ? false : running_credit;

			await ctx.db.order.update({
				where: {
					id: input.orderId,
				},
				data: {
					rest: rest - input.amount,
					status: statusIsPaid,
					running_credit: continueRunningCredit,					
				},
			});

			const payment = ctx.db.payments.create({
				data: {
					amount: input.amount,
					type: input.type,
					installments: input.installments,
					orderId: input.orderId,
					orgId: ctx.session.user.orgId,
				}
			});

			return payment;
		}),

	list: protectedProcedure
		.input(z.object({
			orderId: z.string(),
		})).query(({ ctx, input }) => {
			const payments = ctx.db.payments.findMany({
				where: {
					orderId: input.orderId,
				},
			});

			return payments;
		}),

	delete: protectedProcedure
		.input(z.object({
			id: z.string(),
		})).mutation(async ({ ctx, input }) => {
			const payment = await ctx.db.payments.delete({
				where: {
					id: input.id,
				},
			});

			const { rest } = await ctx.db.order.findFirstOrThrow({
				where: {
					id: payment.orderId!,
				},
			});

			await ctx.db.order.update({
				where: {
					id: payment.orderId!,
				},
				data: {
					rest: rest + payment.amount,
					status: rest + payment.amount === 0,
				},
			});

			return payment;
		}),

	update: protectedProcedure
		.input(z.object({
			id: z.string(),
			amount: z.number().min(1),
			type: z.enum([
				"debit_card",
				"credit_card",
				"pix",
				"money"
			]),
			installments: z.number().min(1),
		})).mutation(async ({ ctx, input }) => {
			const payment = await ctx.db.payments.update({
				where: {
					id: input.id,
				},
				data: {
					amount: input.amount,
					type: input.type,
					installments: input.installments,
				}
			});

			if (!payment.orderId) {
				throw new Error("Pagamento não encontrado");
			}

			const { total } = await ctx.db.order.findUniqueOrThrow({
				where: {
					id: payment.orderId,
				},
			});

			const payments = await ctx.db.payments.findMany({
				where: {
					orderId: payment.orderId,
				},
			});

			const sum = payments.reduce((acc, curr) => acc + curr.amount, 0);

			if (sum > total) {
				throw new Error("Valor da parcela maior que o valor total");
			}

			await ctx.db.order.update({
				where: {
					id: payment.orderId,
				},
				data: {
					rest: total - sum,
					status: total - sum === 0,
				},
			});

			return payment;
		}),

	get: protectedProcedure
		.input(z.object({
			id: z.string(),
		})).query(({ ctx, input }) => {
			const payment = ctx.db.payments.findUnique({
				where: {
					id: input.id,
				},
			});

			return payment;
		}),

	listAll: protectedProcedure
		.query(async ({ ctx }) => {
			const payments = await ctx.db.payments.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
			});

			return payments;
		}),

	listAllByRange: protectedProcedure
		.input(z.object({
			startDate: z.string().or(z.date()),
			endDate: z.string().or(z.date()),
		})).query(async ({ ctx, input }) => {
			const payments = await ctx.db.payments.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					createdAt: {
						gte: new Date(input.startDate),
						lte: new Date(input.endDate),
					},
				},
			});

			return payments;
		}),
});
