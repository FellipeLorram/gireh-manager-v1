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
			const orgs = await ctx.db.userOrg.findMany({
				where: {
					userId: ctx.session.user.id,
				},
				include: {
					org: true,
				},
			});

			return orgs;
		}),
});
