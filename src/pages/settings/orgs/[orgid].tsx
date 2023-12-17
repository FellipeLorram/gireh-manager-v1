import { OrgForm } from "@/components/forms/org-form";
import { type OrgFormSchema } from "@/components/forms/org-form/schema";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export default function Page() {
	const { toast, } = useToast();
	const { query } = useRouter();
	const { data, isLoading: isLoadingQuery, refetch } = api.org.getOrgById.useQuery({
		id: query.orgid as string,
	}, {
		enabled: !!query.orgid,
	});

	const { mutate, isLoading: isLoadingUpdate } = api.org.update.useMutation({
		onSuccess: async () => {
			toast({
				title: "Organização atualizada com sucesso",
			});
			await refetch();
		},
	});

	const onSubmit = (data: OrgFormSchema) => {
		mutate({
			id: query.orgid as string,
			...data,
		});
	}

	return (
		<DashboardLayout>
			<SettingsLayout>
				<div className="w-full border rounded">


					<div className="w-full p-4 border-b">
						{isLoadingQuery ? (
							<Skeleton className="w-[100px] h-[20px] rounded" />
						) : (
							<h1 className="text-lg">
								{data?.name}
							</h1>
						)}
					</div>

					{isLoadingQuery ? (
						<div className="w-full p-4 space-y-6">
							<Skeleton className="w-full h-[60px] rounded" />
							<Skeleton className="w-full h-[60px] rounded" />
						</div>
					) : (
						<OrgForm
							onSubmit={onSubmit}
							isLoading={isLoadingUpdate}
							defaultValues={{
								name: data?.name ?? "",
								nickName: data?.nickName ?? "",
								printType: data?.printType as "small" | "fullPage" | "middle" ?? "middle",
							}}
						/>
					)}
				</div >
			</SettingsLayout >
		</DashboardLayout >
	)
}
