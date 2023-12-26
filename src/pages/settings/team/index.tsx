import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api";
import Link from "next/link";

export default function Page() {
	const { data, isLoading } = api.user.list.useQuery();

	return (
		<DashboardLayout>
			<SettingsLayout>
				<div className="w-full border rounded">
					<div className="w-full border-b p-4">
						<h1 className="text-lg font-medium">
							Time
						</h1>
					</div>
					<div className="p-4 space-y-4">
						{isLoading && (
							<>
								<Skeleton className="w-full h-[50px] rounded" />
								<Skeleton className="w-full h-[50px] rounded" />
							</>
						)}

						{data?.length === 0 && (
							<p className="text-center text-muted-foreground">
								Nenhum usuário encontrado.
							</p>
						)}

						{data?.map((user) => (
							<div key={user.id} className="w-full border rounded py-2 px-4 flex flex-row items-center justify-between">
								<div className="flex flex-row items-center justify-center gap-2">
									<p>{user.name}</p>
									{user.role === "ADMIN" && <Badge variant="outline">admin</Badge>}
								</div>
								<Link
									className={buttonVariants({ variant: "secondary", size: "sm" })}
									href={`/settings/team/${user.id}`}>
									Editar
								</Link>
							</div>
						))}
					</div>
					<div className="border-t p-4">
						<Link
							className={buttonVariants({ variant: "secondary" })}
							href="/settings/team/new">
							Adicionar Usuário
						</Link>
					</div>
				</div>
			</SettingsLayout>
		</DashboardLayout>
	)
}
