import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { startOfWeek, sub } from "date-fns";
import { type Order } from "@prisma/client";

export type ReturnType = {
	moneyEntry: number;
	numberOfOrders: number;
	orderTotal: number;
	numberOfPayments: number;
	newCustomers: number;
	moneyToEntry: number;
	appointments: number;
	notPaidOrders: Order[];
}

type lastMonthsAverage = {
	month: string,
	total: number,
}

export const reportsRouter = createTRPCRouter({
	dashboardLastWeekReport: protectedProcedure
		.query(async ({ ctx }) => {
			const today = new Date();
			const lastFriday = sub(startOfWeek(today, { weekStartsOn: 1 }), { days: 2 });

			const customers = await ctx.db.customer.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					createdAt: {
						gte: lastFriday,
					},
				},
			});

			const orders = await ctx.db.order.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					createdAt: {
						gte: lastFriday,
					},
				},
			});

			const payments = await ctx.db.payments.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					createdAt: {
						gte: lastFriday,
					},
				},
			});

			return {
				newCustomers: customers.length,
				numberOfOrders: orders.length,
				moneyEntry: payments.reduce((acc, curr) => acc + curr.amount, 0),
				orderTotal: orders.reduce((acc, curr) => acc + curr.total, 0),
			}
		}),

	reportPerRange: protectedProcedure
		.input(z.object({
			startDate: z.date(),
			endDate: z.date(),
		}))
		.query(
			async ({ ctx, input }): Promise<ReturnType> => {
				const startDate = new Date(input.startDate);
				const endDate = new Date(input.endDate);

				const customers = await ctx.db.customer.findMany({
					where: {
						orgId: ctx.session.user.orgId,
						createdAt: {
							gte: startDate,
							lte: endDate,
						},
					},
				});


				const orders = await ctx.db.order.findMany({
					where: {
						orgId: ctx.session.user.orgId,
						createdAt: {
							gte: startDate,
							lte: endDate,
						},
					},

					include: {
						Frame: true,
						Lenses: true,
					},
				});

				const moneyToEntry = orders.reduce((acc, curr) => acc + curr.rest, 0);


				const payments = await ctx.db.payments.findMany({
					where: {
						orgId: ctx.session.user.orgId,
						createdAt: {
							gte: startDate,
							lte: endDate,
						},
					},
				});

				const appoiuntments = await ctx.db.appointment.findMany({
					where: {
						orgId: ctx.session.user.orgId,
						createdAt: {
							gte: startDate,
							lte: endDate,
						},
					},
				});

				return {
					newCustomers: customers.length,
					numberOfOrders: orders.length,
					moneyEntry: payments.reduce((acc, curr) => acc + curr.amount, 0),
					orderTotal: orders.reduce((acc, curr) => acc + curr.total, 0),
					notPaidOrders: orders.filter(order => !order.status),
					appointments: appoiuntments.length,
					numberOfPayments: payments.length,
					moneyToEntry,
				}
			}
		),

	birthdayCustomers: protectedProcedure
		.query(async ({ ctx }) => {
			const today = new Date();
			const customers = await ctx.db.customer.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
			});

			return customers.filter(customer => {
				if (!customer.birthDate) return false;
				const customerBirthday = new Date(customer.birthDate);
				return customerBirthday.getMonth() === today.getMonth();
			});
		}),

	ageAvarege: protectedProcedure
		.query(async ({ ctx }) => {
			const customers = await ctx.db.customer.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
			});

			return (customers.reduce((acc, curr) => acc + (curr?.age ?? 0), 0) / customers.length).toFixed(0);
		}),

	lastOrderOverAnYearCustomers: protectedProcedure
		.query(async ({ ctx }) => {
			const today = new Date();
			const lastYear = sub(today, { years: 1 });

			const customers = await ctx.db.customer.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
			});

			const orders = await ctx.db.order.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					createdAt: {
						lte: lastYear,
					},
				},
			});

			const customersWithOrders = customers.filter(customer => {
				const customerOrders = orders.filter(order => order.customerId === customer.id);
				return customerOrders.length > 0;
			});

			return customersWithOrders;
		}),

	numberOfOrdersAndCustomers: protectedProcedure
		.query(async ({ ctx }) => {
			const customers = await ctx.db.customer.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
			});

			const orders = await ctx.db.order.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
			});

			return {
				numberOfCustomers: customers.length,
				numberOfOrders: orders.length,
			}
		}),

	lastMonthsAverage: protectedProcedure
		.query(async ({ ctx }): Promise<lastMonthsAverage[]> => {
			const today = new Date();
			const lastYear = sub(today, { years: 1 });

			const orders = await ctx.db.order.findMany({
				where: {
					orgId: ctx.session.user.orgId,
					createdAt: {
						gte: lastYear,
					},
				},
			});

			const januaryTotal = orders.filter(order => order.createdAt.getMonth() === 0).reduce((acc, curr) => acc + curr.total, 0);
			const februaryTotal = orders.filter(order => order.createdAt.getMonth() === 1).reduce((acc, curr) => acc + curr.total, 0);
			const marchTotal = orders.filter(order => order.createdAt.getMonth() === 2).reduce((acc, curr) => acc + curr.total, 0);
			const aprilTotal = orders.filter(order => order.createdAt.getMonth() === 3).reduce((acc, curr) => acc + curr.total, 0);
			const mayTotal = orders.filter(order => order.createdAt.getMonth() === 4).reduce((acc, curr) => acc + curr.total, 0);
			const juneTotal = orders.filter(order => order.createdAt.getMonth() === 5).reduce((acc, curr) => acc + curr.total, 0);
			const julyTotal = orders.filter(order => order.createdAt.getMonth() === 6).reduce((acc, curr) => acc + curr.total, 0);
			const augustTotal = orders.filter(order => order.createdAt.getMonth() === 7).reduce((acc, curr) => acc + curr.total, 0);
			const septemberTotal = orders.filter(order => order.createdAt.getMonth() === 8).reduce((acc, curr) => acc + curr.total, 0);
			const octoberTotal = orders.filter(order => order.createdAt.getMonth() === 9).reduce((acc, curr) => acc + curr.total, 0);
			const novemberTotal = orders.filter(order => order.createdAt.getMonth() === 10).reduce((acc, curr) => acc + curr.total, 0);
			const decemberTotal = orders.filter(order => order.createdAt.getMonth() === 11).reduce((acc, curr) => acc + curr.total, 0);

			return [
				{ month: "Jan", total: januaryTotal },
				{ month: "Fev", total: februaryTotal },
				{ month: "Mar", total: marchTotal },
				{ month: "Abr", total: aprilTotal },
				{ month: "Mai", total: mayTotal },
				{ month: "Jun", total: juneTotal },
				{ month: "Jul", total: julyTotal },
				{ month: "Ago", total: augustTotal },
				{ month: "Set", total: septemberTotal },
				{ month: "Out", total: octoberTotal },
				{ month: "Nov", total: novemberTotal },
				{ month: "Dez", total: decemberTotal },
			]
		}),
});