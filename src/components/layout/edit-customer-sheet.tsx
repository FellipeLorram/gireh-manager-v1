import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { CustomerForm } from "../forms/customer-form"
import { api } from "@/utils/api";
import { useToast } from "../ui/use-toast";
import { useRef } from "react";
import { type CustomerFormSchema } from "../forms/customer-form/schema";

interface Props {
	id: string;
}

export default function EditCustomerSheet({ id }: Props) {
	const SheetCloseRef = useRef<HTMLButtonElement>(null);
	const { toast } = useToast();
	const { data, refetch } = api.customer.get.useQuery({
		id,
	}, {
		enabled: !!id,
	});

	const { mutate, isLoading } = api.customer.update.useMutation({
		onSuccess: async () => {
			await refetch();
			toast({
				title: 'Cliente atualizado com sucesso!',
			});
			SheetCloseRef.current?.click();
		},
		onError: (error) => {
			toast({
				title: 'Erro ao atualizar cliente',
				description: error.message,
			});
		}
	});

	const onSubmit = (values: CustomerFormSchema) => {
		mutate({
			id,
			...values,
			phone: values.phone?.map(phone => {
				return {
					id: phone.id ?? '',
					number: phone.number ?? ''
				}
			})
		});
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="w-full md:w-auto" variant="outline">
					Editar
				</Button>
			</SheetTrigger>
			<SheetContent className="overflow-y-auto">
				<SheetHeader>
					<SheetTitle>
						Editar Cliente
					</SheetTitle>
				</SheetHeader>
				<CustomerForm
					defaultValues={{
						birthDate: data?.birthDate?.toISOString().slice(0, 10) ?? '',
						name: data?.name ?? '',
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
					isLoading={isLoading}
					onSubmit={onSubmit}
					searchEnabled={false}
				/>
				<SheetClose ref={SheetCloseRef}/>
			</SheetContent>
		</Sheet>

	)
}
