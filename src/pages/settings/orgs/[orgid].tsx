import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { OrgPreferences } from "@/components/layout/settings-layout/org-preferences";
import { OrgUsers } from "@/components/layout/settings-layout/org-users";

export default function Page() {
	return (
		<DashboardLayout>
			<SettingsLayout>
				<div className="space-y-12">
					<OrgPreferences />
					<OrgUsers />
				</div>
			</SettingsLayout>
		</DashboardLayout >
	)
}
