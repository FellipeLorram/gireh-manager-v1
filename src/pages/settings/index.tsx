import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { ChangeAvatar } from "@/components/layout/settings-layout/change-avatar";
import { ChangeUsername } from "@/components/layout/settings-layout/change-username";

export default function Page() {
  return (
    <DashboardLayout>
      <SettingsLayout>
        <div className="w-full max-w-4xl flex flex-col gap-8">
          <ChangeUsername />
          <ChangeAvatar />
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
