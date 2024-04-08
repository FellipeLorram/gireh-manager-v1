import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/layout/settings-layout";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { OrgForm } from "@/components/forms/org-form";
import { type OrgFormSchema } from "@/components/forms/org-form/schema";

export default function Page() {
	const { push } = useRouter();
	const { toast } = useToast();
	const { mutate, isLoading: isMutationLoading } = api.org.create.useMutation({
		onSuccess: async (data) => {
			toast({
				title: 'Ótica Criada com Sucesso',
			});

			await push(`/settings/orgs/${data.id}`);
		}
	});

	const onSubmit = (data: OrgFormSchema) => {
		mutate(data);
	}

	return (
		<DashboardLayout>
			<SettingsLayout>
				<div className="w-full border rounded bg-card">
					<div className="p-4 border-b">
						<h1 className="text-lg font-medium">Novo ótica</h1>
					</div>

					<OrgForm
						onSubmit={onSubmit}
						isLoading={isMutationLoading}
					/>
				</div>

			</SettingsLayout>
		</DashboardLayout>
	)
}
