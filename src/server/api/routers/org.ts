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
});
