import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { CircleDashed } from "lucide-react";
import { ResponsiveDrawer } from "@/components/ui/responsive-drawer";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export function RemoveCustomerDrawer() {
	const { toast } = useToast();
	const { query, push } = useRouter();
	const { customer } = api.useUtils();
	const { mutate, isLoading } = api.customer.delete.useMutation({
		onSuccess: async () => {
			toast({
				title: 'Cliente removido com sucesso',
			});
			await customer.list.invalidate();
			await push('/customers');
		}, onError: (error) => {
			toast({
				title: 'Erro ao remover cliente',
				description: error.message,
				variant: 'destructive',
			});
		}
	});

	const customerId = query.customerid as string;

	return (
		<ResponsiveDrawer
			title="Excluir Cliente"
			trigger={<Button
				disabled={!customerId}
				variant="destructive"
				size="sm">
				Deletar
			</Button>}
			content={
				<div className="p-4 pt-0">
					<p className="text-muted-foreground text-xs mb-4">
						Esta ação não pode ser desfeita.
					</p>

					<Button
						disabled={isLoading}
						variant="destructive"
						onClick={() => {
							mutate({ id: customerId });
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
