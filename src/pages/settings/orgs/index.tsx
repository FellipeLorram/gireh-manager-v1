import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api";
import Link from "next/link";

export default function Page() {
  const { data, isLoading } = api.org.listUserOrgs.useQuery();

  return (
    <DashboardLayout>
      <SettingsLayout>
        <div className="w-full border rounded">
          <div className="w-full border-b p-4">
            <h1 className="text-lg font-medium">
              Óticas
            </h1>
          </div>
          <div className="p-4 space-y-4">
            {isLoading && (
              <>
                <Skeleton className="w-full h-[50px] rounded" />
                <Skeleton className="w-full h-[50px] rounded" />
              </>
            )}
            {data?.map((org) => (
              <div key={org.id} className="w-full border rounded py-2 px-4 flex flex-row items-center justify-between">
                <p >{org.name}</p>
                <Link
                  className={buttonVariants({ variant: "secondary", size: "sm" })}
                  href={`/settings/orgs/${org.id}`}>
                  Gerenciar
                </Link>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <Link
              className={buttonVariants({ variant: "secondary", size: "sm" })}
              href="/settings/orgs/new">
              Adicionar Ótica
            </Link>
          </div>
        </div>
      </SettingsLayout>
    </DashboardLayout>
  )
}
