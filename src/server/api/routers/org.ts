import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const orgRouter = createTRPCRouter({
	get: protectedProcedure
		.query(async ({ ctx }) => {
			const org = await ctx.db.org.findFirstOrThrow({
				where: {
					id: ctx.session.user.orgId,
				},

			});

			return org;
		}),

	listUserOrgs: protectedProcedure
		.query(async ({ ctx }) => {
			const orgsIds = await ctx.db.userOrg.findMany({
				where: {
					userId: ctx.session.user.id,
				},
			});

			const orgs = await ctx.db.org.findMany({
				where: {
					id: {
						in: orgsIds.map((org) => org.orgId),
					},
				},
			});

			return orgs;
		}),


	getOrgById: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.query(async ({ ctx, input }) => {
			const org = await ctx.db.org.findFirst({
				where: {
					id: input.id,
				},
			});

			return org;
		}),

	update: protectedProcedure
		.input(z.object({
			id: z.string(),
			name: z.string().min(3, 'Nome inválido'),
			nickName: z.string().optional(),
			printType: z.enum(['fullPage', 'middle', 'small']).optional(),
		})).mutation(async ({ ctx, input }) => {
			const org = await ctx.db.org.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					nickName: input.nickName,
					printType: input.printType,
				},
			});

			return org;
		}),

	getOrgUsers: protectedProcedure.input(z.object({
		id: z.string(),
	})).query(async ({ ctx, input }) => {
		const org = await ctx.db.org.findFirst({
			where: {
				id: input.id,
			},
			include: {
				users: true,
			},
		});

		return org?.users.filter(user => user.id !== ctx.session.user.id);
	}),

	create: protectedProcedure
		.input(z.object({
			name: z.string().min(3, 'Nome inválido'),
			nickName: z.string().optional(),
			printType: z.enum(['fullPage', 'middle', 'small']).optional(),
		}))
		.mutation(async ({ ctx, input }) => {
			const org = await ctx.db.org.create({
				data: {
					name: input.name,
					nickName: input.nickName,
					printType: input.printType,
				},
			});

			await ctx.db.userOrg.create({
				data: {
					orgId: org.id,
					userId: ctx.session.user.id,
				},
			});

			return org;
		})
});
