import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
} from "@/server/api/trpc";

export const appointmentRouter = createTRPCRouter({
	list: protectedProcedure
		.query(({ ctx }) => {
			const appointments = ctx.db.appointment.findMany({
				where: {
					orgId: ctx.session.user.orgId,
				},
			});

			return appointments;
		}),
});
