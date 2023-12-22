import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { EditUserForm, type UserFormValues } from "@/components/forms/editor-user-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function Page() {
	const { query } = useRouter();
	const { toast } = useToast();
	const { data: orgs, isLoading: isLoadingListQuery } = api.org.listUserOrgs.useQuery();
	const { data, isLoading: isQueryLoading, refetch } = api.user.get.useQuery({
		id: query.userid as string
	}, {
		enabled: !!query.userid
	});

	const { mutate, isLoading: isMutationLoading } = api.user.updateById.useMutation({
		onSuccess: async () => {
			toast({
				title: 'Usuário atualizado com sucesso',
			});
			await refetch();
		}
	});

	const onSubmit = (data: UserFormValues) => {
		mutate({
			id: query.userid as string,
			...data
		});
	}
	return (
		<DashboardLayout>
			<SettingsLayout>
				<div className="w-full border rounded">
					<div className="p-4 border-b">
						<h1 className="text-lg font-medium">Editar Usuário</h1>
					</div>
					{isQueryLoading || isLoadingListQuery ? (
						<div className="p-4">
							<Skeleton className="w-full h-[50px] rounded mb-6" />
							<Skeleton className="w-full h-[50px] rounded" />
						</div>
					) : (
						<EditUserForm
							onSubmit={onSubmit}
							isLoading={isMutationLoading}
							defaultValues={{
								name: data?.name ?? '',
								role: data?.role as 'ADMIN' | 'USER' ?? 'USER',
								orgs: data?.UserOrg.map(o => o.orgId) ?? [],
								email: data?.email ?? '',
							}}
							allOrgs={orgs?.map(o => ({
								id: o.id,
								name: o.name,
							})) ?? []}
						/>
					)}
				</div>

			</SettingsLayout>
		</DashboardLayout>
	)
}
