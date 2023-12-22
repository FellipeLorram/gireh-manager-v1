import { OrgForm } from "@/components/forms/org-form";
import { type OrgFormSchema } from "@/components/forms/org-form/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

export function OrgPreferences() {
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
		<div className="w-full border rounded">
			<div className="w-full p-4 border-b">
				{isLoadingQuery ? (
					<Skeleton className="w-[100px] h-[20px] rounded" />
				) : (
					<h1 className="text-lg font-medium">
						{data?.name}
					</h1>
				)}
			</div>

			{isLoadingQuery ? (
				<div className="w-full p-4 space-y-6">
					<Skeleton className="w-full h-[50px] rounded" />
					<Skeleton className="w-full h-[50px] rounded" />
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
	)
}
