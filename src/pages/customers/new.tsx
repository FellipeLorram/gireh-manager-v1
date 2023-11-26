import { CustomerForm, type CustomerFormSchema } from "@/components/forms/customer-form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
	const { toast } = useToast();
	const { push } = useRouter();
	const { mutate, isLoading } = api.customer.create.useMutation({
		onSuccess: async ({inLine}) => {
			toast({
				description: 'Cliente cadastrado com sucesso',
			});
			if (inLine) await push('/appointments')
			else await push('/')
		},
		onError: (error) => {
			toast({
				description: error.message,
			});
		}
	});


	const onSubmit = (data: CustomerFormSchema) => {
		mutate({
			...data,
			phone: data.phone?.map((phone) => ({
				...phone,
				number: phone.number,
			})),
		});
	}

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-center justify-start py-4 gap-8">
			<div className="w-full flex flex-row">
				<Link href="/">
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl font-bold text-center mx-auto">Novo Cliente</h1>
			</div>
			<CustomerForm
				className="my-auto"
				onSubmit={onSubmit}
				isLoading={isLoading}
			/>
		</div>
	)
}
