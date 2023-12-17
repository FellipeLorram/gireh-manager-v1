import { api } from "@/utils/api"
import { useRouter } from "next/router";

export function OrgUsers() {
	const { query } = useRouter();
	const { data } = api.org.getOrgUsers.useQuery({
		id: query.orgid as string,
	});

	return (
		<div className="w-full border rounded">
			<div className="w-full border-b p-4">
				<h1 className="text-lg">
					Usuários
				</h1>
			</div>
			<div className="p-4 space-y-2">
				{data?.map((user) => (
					<div key={user.id} className="w-full border rounded p-2">
						{user.name}
					</div>
				))}
			</div>
		</div>
	)
}
