import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";

export default function Page() {
  return (
    <DashboardLayout>
      <SettingsLayout>
        <div className="w-full flex flex-col gap-6">
          
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
