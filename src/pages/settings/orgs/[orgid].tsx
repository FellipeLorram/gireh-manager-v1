import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { OrgPreferences } from "@/components/layout/settings-layout/org-preferences";
import { OrgUsers } from "@/components/layout/settings-layout/org-users";
import { RemoveOrgDrawer } from "@/components/layout/settings-layout/remove-org";

export default function Page() {
	return (
		<DashboardLayout>
			<SettingsLayout>
				<div className="space-y-8">
					<OrgPreferences />
					<OrgUsers />
					<div className='w-full bg-red-100/10 dark:bg-red-900/10 border dark:border-red-950 border-red-200 flex items-center justify-end p-4 mt-10 rounded'>
						<RemoveOrgDrawer />
					</div>

				</div>
			</SettingsLayout>
		</DashboardLayout >
	)
}
