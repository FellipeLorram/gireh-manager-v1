import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import * as argon2 from "argon2";

export const userRouter = createTRPCRouter({
	update: protectedProcedure
		.input(z.object({
			name: z.string(),
			email: z.string().email().optional(),
			newPassword: z.string().optional(),
		}))
		.mutation(async ({ ctx, input }) => {
			if (input.newPassword) {
				const passwordHash = await argon2.hash(input.newPassword);

				await ctx.db.user.update({
					where: {
						id: ctx.session.user.id,
					},
					data: {
						password_hash: passwordHash,
					},
				});
			}

			const user = await ctx.db.user.update({
				where: {
					id: ctx.session.user.id,
				},
				data: {
					email: input.email,
					name: input.name,
				},
			});

			return user;
		}),

	list: protectedProcedure
		.query(async ({ ctx }) => {
			const usersOrgs = await ctx.db.userOrg.findMany({
				where: {
					userId: ctx.session.user.id,
				},
			});

			const users = await ctx.db.user.findMany({
				where: {
					UserOrg: {
						some: {
							orgId: {
								in: usersOrgs.map((userOrg) => userOrg.orgId),
							},
						},
					},
					id: {
						not: ctx.session.user.id,
					},
				},
				include: {
					UserOrg: true,
				}
			});

			return users;
		}),

	getOwn: protectedProcedure
		.query(async ({ ctx }) => {
			const user = await ctx.db.user.findUniqueOrThrow({
				where: {
					id: ctx.session.user.id,
				},
				include: {
					UserOrg: true,
				}
			});

			return user;
		}),

	get: protectedProcedure
		.input(z.object({
			id: z.string(),
		}))
		.query(async ({ ctx, input }) => {
			const user = await ctx.db.user.findUniqueOrThrow({
				where: {
					id: input.id,
				},
				include: {
					UserOrg: true,
				}
			});

			return user;
		}),

	updateById: protectedProcedure
		.input(z.object({
			id: z.string(),
			name: z.string().optional(),
			role: z.enum([
				"ADMIN",
				"USER"
			]).optional(),
			orgs: z.array(z.string()),
			newPassword: z.string().optional(),
		}))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.userOrg.deleteMany({
				where: {
					userId: input.id,
					orgId: {
						notIn: input.orgs,
					}
				},
			});

			await ctx.db.userOrg.createMany({
				data: input.orgs.map((orgId) => ({
					orgId,
					userId: input.id,
				})),
				skipDuplicates: true,
			});

			if (input.newPassword) {
				const passwordHash = await argon2.hash(input.newPassword);

				await ctx.db.user.update({
					where: {
						id: input.id,
					},
					data: {
						password_hash: passwordHash,
					},
				});
			}

			const user = await ctx.db.user.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					role: input.role,
				},
			});

			if(!input.orgs.includes(user.orgId!)) {
				await ctx.db.user.update({
					where: {
						id: input.id,
					},
					data: {
						orgId: input.orgs[0],
					},
				});
			}

			return user;
		}),

	create: protectedProcedure
		.input(z.object({
			name: z.string(),
			email: z.string().email(),
			role: z.enum([
				"ADMIN",
				"USER"
			]),
			orgs: z.array(z.string()),
			password: z.string(),
		}))
		.mutation(async ({ ctx, input }) => {
			const passwordHash = await argon2.hash(input.password);

			const user = await ctx.db.user.create({
				data: {
					email: input.email,
					name: input.name,
					role: input.role,
					password_hash: passwordHash,
					orgId: input.orgs[0],
				},
			});

			await ctx.db.userOrg.createMany({
				data: input.orgs.map((orgId) => ({
					orgId,
					userId: user.id,
				})),
				skipDuplicates: true,
			});

			return user;
		}),

});

