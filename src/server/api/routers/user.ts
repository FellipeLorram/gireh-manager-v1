import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
	update: protectedProcedure
		.input(z.object({
			name: z.string(),
			email: z.string().email().optional(),
		}))
		.mutation(async ({ ctx, input }) => {
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
});

