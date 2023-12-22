import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api"
import Link from "next/link";
import { useRouter } from "next/router";

export function OrgUsers() {
	const { query } = useRouter();
	const { data, isLoading } = api.org.getOrgUsers.useQuery({
		id: query.orgid as string,
	}, {
		enabled: !!query.orgid,
	});

	return (
		<div className="w-full border rounded">
			<div className="w-full border-b p-4">
				<h1 className="text-lg font-medium">
					Usuários
				</h1>
			</div>
			<div className="p-4 space-y-4">
				{isLoading && (
					<>
						<Skeleton className="w-full h-[50px] rounded" />
						<Skeleton className="w-full h-[50px] rounded" />
					</>
				)}
				{data?.map((user) => (
					<div key={user.id} className="w-full border rounded px-4 py-2 flex flex-row items-center justify-between">
						<div className="flex flex-row items-center justify-center gap-2">
							<p>{user.name}</p>
							{user.role === 'ADMIN' && <Badge variant="outline">admin</Badge>}
						</div>
						<Link
							className={buttonVariants({ variant: 'secondary', size: 'sm' })}
							href={`/settings/team/${user.id}`}>
							Editar
						</Link>
					</div>
				))}

				{data?.length === 0 && (
					<div className="text-center text-muted-foreground">
						Você é o único usuário desta Ótica.
					</div>
				)}
			</div>
		</div>
	)
}
