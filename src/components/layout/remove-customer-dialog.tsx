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

export function RemoveCustomerDialog() {
	const { id } = useRouter().query;
	const { mutate } = api.customer.delete.useMutation()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive">
					Deletar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Excluir
					</DialogTitle>
					<DialogDescription>
						Você tem certeza que deseja excluir este cliente?
					</DialogDescription>
				</DialogHeader>
				<Button
					onClick={() => mutate({ id: id as string })}
					variant="outline"
				>
					Excluir
				</Button>
			</DialogContent>
		</Dialog>
	)
}
