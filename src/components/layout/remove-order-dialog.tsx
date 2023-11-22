import { useRouter } from "next/router";
import { Button } from "../ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog"
import { api } from "@/utils/api";

export function RemoveOrderDialog() {
	const { push, query } = useRouter();
	const { mutate } = api.order.delete.useMutation({
		onSuccess: async () => {
			await push("/orders");
		}
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full md:w-auto" variant="destructive">
					Deletar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Excluir
					</DialogTitle>
					<DialogDescription>
						Você tem certeza que deseja excluir esta venda?
					</DialogDescription>
				</DialogHeader>
				<Button
					onClick={() => mutate({ id: query.orderid as string })}
					variant="outline"
				>
					Excluir
				</Button>
			</DialogContent>
		</Dialog>
	)
}