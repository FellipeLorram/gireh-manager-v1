import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { CreateUserForm, type CreateUserFormValues } from "@/components/forms/create-user-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function Page() {
	const { push } = useRouter();
	const { toast } = useToast();
	const { data: orgs, isLoading: isLoadingListQuery } = api.org.listUserOrgs.useQuery();
	const { mutate, isLoading: isMutationLoading } = api.user.create.useMutation({
		onSuccess: async (data) => {
			toast({
				title: 'Usuário Criado com Sucesso',
			});

			await push(`/settings/team/${data.id}`);
		}
	});

	const onSubmit = (data: CreateUserFormValues) => {
		mutate(data);
	}

	return (
		<DashboardLayout>
			<SettingsLayout>
				<div className="w-full border rounded bg-card">
					<div className="p-4 border-b">
						<h1 className="text-lg font-medium">Novo usuário</h1>
					</div>
					{isLoadingListQuery ? (
						<div className="p-4">
							<Skeleton className="w-full h-[50px] rounded mb-6" />
							<Skeleton className="w-full h-[50px] rounded" />
						</div>
					) : (
						<CreateUserForm
							onSubmit={onSubmit}
							isLoading={isMutationLoading}
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
