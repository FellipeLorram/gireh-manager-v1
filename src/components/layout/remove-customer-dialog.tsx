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
import { useToast } from "../ui/use-toast";
import { CircleDashed } from "lucide-react";

export function RemoveCustomerDialog() {
	const { toast } = useToast();
	const { query, push } = useRouter();
	const { mutate, isLoading } = api.customer.delete.useMutation({
		onSuccess: async () => {
			toast({
				title: 'Cliente removido com sucesso',
			});

			await push('/customers');
		}
	})

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
					onClick={() => mutate({ id: query.customerid as string })}
					variant="outline"
				>
					{isLoading && <CircleDashed size={16} className="animate-spin mr-2" />}
					Excluir
				</Button>
			</DialogContent>
		</Dialog>
	)
}
