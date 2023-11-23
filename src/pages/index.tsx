import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DashboardBirthdaysCustomers } from "@/components/layout/dashboard/dashboard-birthdays-month-customers";
import { DashboardLastMonthsAverage } from "@/components/layout/dashboard/dashboard-last-months-average";
import { DashboardOrderOverAnYear } from "@/components/layout/dashboard/dashboard-last-order-over-year-customers";
import { DashboardLastPayments } from "@/components/layout/dashboard/dashboard-last-payments";
import { DashboardLastWeekReport } from "@/components/layout/dashboard/dashboard-last-week-report";
import { DashboardTotalCustomersOrders } from "@/components/layout/dashboard/dashboard-total-customers-orders";

export default function Page() {
  return (
    <DashboardLayout>
      <DashboardLastWeekReport />

      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-2 mt-8">
        <DashboardLastPayments />
        <DashboardBirthdaysCustomers />
      </div>
      
      <div className="mt-8">
        <DashboardTotalCustomersOrders />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-2 mt-8">
        <DashboardOrderOverAnYear />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-2 mt-8">
        <DashboardLastMonthsAverage />
      </div>

    </DashboardLayout>
  );
}
