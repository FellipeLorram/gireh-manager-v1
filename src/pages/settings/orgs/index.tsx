import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/utils/api";
import Link from "next/link";

export default function Page() {
  const { data } = api.org.listUserOrgs.useQuery();

  return (
    <DashboardLayout>
      <SettingsLayout>
        <div className="w-full flex flex-col gap-6">
          {data?.map((org) => (
            <div
              key={org.id}
              className="w-full border rounded"
            >
              <div className="w-full p-4">
                <h1 className="text-lg">
                  {org.name}
                </h1>
              </div>
              <div className="w-full border-t flex flex-row items-center justify-between p-4 text-sm text-muted-foreground">
                <p>
                  Usúarios: {org.users.length}
                </p>
                <p>
                  Clientes: {org.Customer.length}
                </p>
                <Link
                  className={buttonVariants({ variant: "secondary" })}
                  href={`/settings/orgs/${org.id}`}>
                  Gerenciar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
