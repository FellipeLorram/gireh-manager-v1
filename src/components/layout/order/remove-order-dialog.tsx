import { useRouter } from "next/router";
import { Button } from "../../ui/button"

import { api } from "@/utils/api";
import { CircleDashed } from "lucide-react";
import { ResponsiveDrawer } from "@/components/ui/responsive-drawer";

export function RemoveOrderDialog() {
	const { push, query } = useRouter();
	const { mutate, isLoading } = api.order.delete.useMutation({
		onSuccess: async () => {
			await push("/orders");
		}
	});

	const orderId = query.orderid as string;

	return (
		<ResponsiveDrawer
			title="Excluir Venda"
			trigger={<Button
				disabled={!orderId}
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
							mutate({ id: orderId });
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
