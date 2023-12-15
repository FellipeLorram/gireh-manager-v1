import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";

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


	listUserOrgsWithUsersCount: protectedProcedure
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
				include: {
					users: true,
				},
			});

			return orgs.map((org) => ({
				...org,
				usersCount: org.users.length,
			}));
		}),
});
