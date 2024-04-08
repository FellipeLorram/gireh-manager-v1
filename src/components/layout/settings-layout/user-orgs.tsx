import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api";

export function UserOrgs() {
	const { data, isLoading: isLoadingQuery } = api.org.listUserOrgs.useQuery();

	return (
		<div className="w-full border rounded mt-8 bg-card">
			<div className="p-4 border-b">
				<h1 className="font-medium text-lg">Óticas</h1>
			</div>

			<div className="w-full p-4">
				{isLoadingQuery && (
					<>
						<Skeleton className="w-full h-[50px] rounded mb-6" />
						<Skeleton className="w-full h-[50px] rounded" />
					</>
				)}

				<div className="flex gap-2 w-full flex-col">
					{data?.map((org) => (
						<div key={org.id} className="w-full px-4 flex justify-between items-center flex-row border rounded p-2">
							<p>{org.name}</p>
							<Button>
								Entrar
							</Button>
						</div>
					))}
				</div>
			</div>
			<div className="w-full p-4 border-t flex flex-row justify-end">
				<Button>
					Salvar
				</Button>
			</div>
		</div>
	)
}
