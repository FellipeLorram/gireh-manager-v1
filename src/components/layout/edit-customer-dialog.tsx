import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { CustomerForm, type CustomerFormSchema } from "../forms/customer-form"
import { api } from "@/utils/api";
import { useToast } from "../ui/use-toast";
import { useRef } from "react";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/router";

interface Props {
	id: string;
}

export default function EditCustomerDialog({ id }: Props) {
	const dialogCloseRef = useRef<HTMLButtonElement>(null);
	const { reload } = useRouter();
	const { toast } = useToast();
	const { data } = api.customer.get.useQuery({
		id,
	}, {
		enabled: !!id,
	});

	const { mutate } = api.customer.update.useMutation({
		onSuccess: () => {
			toast({
				title: 'Cliente atualizado com sucesso!',
				action: <ToastAction onClick={reload} altText="Atualizar Página">Atualizar Página</ToastAction>

			});
			dialogCloseRef.current?.click();
		},
		onError: (error) => {
			toast({
				title: 'Erro ao atualizar cliente',
				description: error.message,
			});
		}
	});

	const onSubmit = (values: CustomerFormSchema) => {
		console.log(values);

		mutate({
			id,
			...values,
			age: Number(values.age),
			phone: values.phone?.map(phone => {
				return {
					id: phone.id ?? '',
					number: phone.number ?? ''
				}
			})
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					Editar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Editar Cliente
					</DialogTitle>
				</DialogHeader>
				<CustomerForm
					defaultValues={{
						name: data?.name ?? '',
						age: data?.age?.toString() ?? '',
						address: data?.address ?? '',
						phone: data?.Phone.map(phone => {
							return {
								id: phone.id,
								number: phone.number
							}
						}) ?? [{
							number: ''
						}],
					}}
					onSubmit={onSubmit}
				/>
				<DialogClose ref={dialogCloseRef}/>
			</DialogContent>
		</Dialog>

	)
}
