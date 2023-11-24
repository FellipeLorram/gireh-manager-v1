import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";
import { FrameSchema, LensesSchema } from "@/components/forms/order-form/form-schema";
import { type Frame } from "@prisma/client";

export const OrderRouter = createTRPCRouter({
	list: protectedProcedure.query(({ ctx }) => {
		const orders = ctx.db.order.findMany({
			where: {
				orgId: ctx.session.user.orgId,
			},
		});

		return orders;
	}),

	listCustomerOrders: protectedProcedure
		.input(z.object({
			customerId: z.string(),
		})).query(({ ctx, input }) => {
			const orders = ctx.db.order.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					customerId: input.customerId,
				},
			});

			return orders;
		}),

	updateOrderSituation: protectedProcedure
		.input(z.object({
			id: z.string(),
			situation: z.enum([
				'SEPARATING',
				'WAITING_LENSES',
				'WAITING_FRAME',
				'ASSEMBLING',
				'READY',
				'DELIVERED'
			]),
		})).mutation(async ({ ctx, input }) => {
			const order = await ctx.db.order.update({
				where: {
					id: input.id,
				},
				data: {
					situation: input.situation,
				},
			});

			return order;
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
			dnp_right: z.number().optional(),
			dnp_left: z.number().optional(),
			frame: z.array(FrameSchema).optional(),
			lenses: z.array(LensesSchema).optional(),
			total: z.number().min(1),
			observation: z.string().optional(),
		}))
		.mutation(async ({ ctx, input }) => {
			const { service_order } = await ctx.db.org.findFirstOrThrow({
				where: {
					id: ctx.session.user.orgId,
				},
			});

			const { name } = await ctx.db.customer.findFirstOrThrow({
				where: {
					id: input.customerId,
				},
			});

			const order = await ctx.db.order.create({
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
					dnp_right: input.dnp_right,
					dnp_left: input.dnp_left,
					total: input.total,
					observation: input.observation,
					rest: input.total,
					customer_name: name,
					service_order: service_order!,
					situation: 'SEPARATING',
					status: false,
					running_credit: false,
					Frame: {
						create: input.frame?.map((frame) => ({
							name: frame.name,
							price: Number(frame.price),
							height: Number(frame.height),
							image_url: frame.image_url,
							reference: frame.reference,
							supplier: frame.supplier,
						})),
					},

					Lenses: {
						create: input.lenses?.map((lenses) => ({
							name: lenses.name,
							price: Number(lenses.price),
						})),
					}
				},
			});

			await ctx.db.org.update({
				where: {
					id: ctx.session.user.orgId,
				},
				data: {
					service_order: service_order! + 1,
				},
			});

			return order;
		}),

	get: protectedProcedure
		.input(z.object({
			id: z.string(),
		})).query(({ ctx, input }) => {
			const order = ctx.db.order.findFirst({
				where: {
					id: input.id,
				},
				include: {
					Frame: true,
					Lenses: true,
					Payments: true,
				}
			});

			return order;
		}),

	delete: protectedProcedure
		.input(z.object({
			id: z.string(),
		})).mutation(async ({ ctx, input }) => {
			await ctx.db.order.delete({
				where: {
					id: input.id,
				},
			});

			await ctx.db.frame.deleteMany({
				where: {
					orderId: input.id,
				},
			});

			await ctx.db.lenses.deleteMany({
				where: {
					orderId: input.id,
				},
			});

			await ctx.db.payments.deleteMany({
				where: {
					orderId: input.id,
				},
			});
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
			dnp_right: z.number().optional(),
			dnp_left: z.number().optional(),
			frame: z.array(FrameSchema.extend({
				id: z.string(),
				price: z.number(),
				height: z.number(),
			})),
			lenses: z.array(LensesSchema.extend({
				id: z.string(),
				price: z.number(),
			})).optional(),
			total: z.number().min(1),
			observation: z.string().optional(),
		}))
		.mutation(async ({ ctx, input }) => {
			const { rest: oldRest, total } = await ctx.db.order.findFirstOrThrow({
				where: {
					id: input.id,
				},
			});

			const rest = oldRest + (input.total - total);

			if (rest < 0) {
				throw new Error('O valor total não pode ser menor que o valor pago');
			}

			const order = ctx.db.order.update({
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
					dnp_right: input.dnp_right,
					dnp_left: input.dnp_left,
					observation: input.observation,
					total: input.total,
					rest: rest,
				},
			});

			const excludedFrames = await ctx.db.frame.findMany({
				where: {
					orderId: input.id,
					id: {
						notIn: input.frame?.map((frame) => frame.id),
					},
				},
			});

			await ctx.db.frame.deleteMany({
				where: {
					id: {
						in: excludedFrames.map((frame) => frame.id),
					},
				},
			});

			const Frames: Frame[] = input.frame?.map((frame) => ({
				id: frame.id,
				name: frame.name,
				price: Number(frame.price),
				height: Number(frame.height),
				image_url: frame.image_url ?? null,
				reference: frame.reference ?? null,
				supplier: frame.supplier ?? null,
				orderId: input.id,
			})) ?? [];

			await Promise.all(Frames.map(async (frame) => {
				await ctx.db.frame.upsert({
					where: {
						id: frame.id,
					},
					create: frame,
					update: frame,
				});
			}));

			const excludedLenses = await ctx.db.lenses.findMany({
				where: {
					orderId: input.id,
					id: {
						notIn: input.lenses?.map((lenses) => lenses.id),
					},
				},
			});

			await ctx.db.lenses.deleteMany({
				where: {
					id: {
						in: excludedLenses.map((lenses) => lenses.id),
					},
				},
			});

			const Lenses = input.lenses?.map((lenses) => ({
				id: lenses.id,
				name: lenses.name,
				price: Number(lenses.price),
				orderId: input.id,
			})) ?? [];

			await Promise.all(Lenses.map(async (lenses) => {
				await ctx.db.lenses.upsert({
					where: {
						id: lenses.id,
					},
					create: lenses,
					update: lenses,
				});
			}));

			return order;
		}),

	listOrdersByDateRange: protectedProcedure
		.input(z.object({
			startDate: z.string().or(z.date()),
			endDate: z.string().or(z.date()),
		})).query(({ ctx, input }) => {
			const orders = ctx.db.order.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					createdAt: {
						gte: new Date(input.startDate),
						lte: new Date(input.endDate),
					},
				},
			});

			return orders;
		}),

	listOrdersBySituation: protectedProcedure
		.input(z.object({
			situation: z.enum([
				'SEPARATING',
				'WAITING_LENSES',
				'WAITING_FRAME',
				'ASSEMBLING',
				'READY',
				'DELIVERED'
			]),
		})).query(({ ctx, input }) => {
			const orders = ctx.db.order.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					situation: {
						equals: input.situation,
					},
				},
			});

			return orders;
		}),
});
