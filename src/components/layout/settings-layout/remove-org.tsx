import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { CircleDashed } from "lucide-react";
import { ResponsiveDrawer } from "@/components/ui/responsive-drawer";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export function RemoveOrgDrawer() {
	const { toast } = useToast();
	const { query, push } = useRouter();
	const { org } = api.useUtils();
	const { mutate, isLoading } = api.org.delete.useMutation({
		onSuccess: async () => {
			toast({
				title: 'Ótica removida com sucesso',
			});
			await org.listUserOrgs.invalidate();
			await push('/settings');
		}
	});

	const orgId = query.orgid as string;

	return (
		<ResponsiveDrawer
			title="Excluir Ótica"
			trigger={<Button
				disabled={!orgId}
				variant="destructive"
				size="sm">
				Deletar
			</Button>}
			content={
				<div className="p-4 pt-0">
					<p className="text-muted-foreground text-xs mb-4">
						Esta ação não pode ser desfeita. <br/>
						Todos os dados relacionados a esta ótica serão removidos.
					</p>

					<Button
						disabled={isLoading}
						variant="destructive"
						onClick={() => {
							mutate({ id: orgId });
						}}
						className="mt-4 w-full md:w-auto"
					>
						{isLoading && <CircleDashed className="animate-spin mr-2 w-4" />}
						Deletar
					</Button>
				</div>
			}
		/>
	)

}
