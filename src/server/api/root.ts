import { createTRPCRouter } from "@/server/api/trpc";
import { CustomerRouter } from "./routers/customer";
import { OrderRouter } from "./routers/order";
import { appointmentRouter } from "./routers/appointment";
import { paymentsRouter } from "./routers/payments";
import { orgRouter } from "./routers/org";

export const appRouter = createTRPCRouter({
  customer: CustomerRouter,
  order: OrderRouter,
  appointment: appointmentRouter,
  payment: paymentsRouter,
  org: orgRouter,
});

export type AppRouter = typeof appRouter;
