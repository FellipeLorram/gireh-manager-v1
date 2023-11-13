import { api } from "@/utils/api";
import { useRouter } from "next/router"
import EditCustomerDialog from "./edit-customer-dialog";


export default function CustomerInfo() {
	const { id } = useRouter().query;
	const { data } = api.customer.get.useQuery({
		id: id as string,
	}, {
		enabled: !!id,
		refetchOnWindowFocus: true,
	});

	return (
		<div className='w-full p-2 border rounded-md'>
			<div className="w-full py-2 px-1 border-b flex flex-row justify-between items-center">
				<p className="text-muted-foreground">Nome:</p>
				<p>{data?.name}</p>
			</div>
			<div className="w-full py-2 px-1 border-b flex flex-row justify-between items-center">
				<p className="text-muted-foreground">Idade:</p>
				<p>{data?.age}</p>
			</div>
			<div className="w-full py-2 px-1 border-b flex flex-row justify-between items-center">
				<p className="text-muted-foreground">Endereço:</p>
				<p>{data?.address}</p>
			</div>
			{data?.Phone.map((phone, index) => (
				<div
					key={phone.number}
					className="w-full py-2 px-1 border-b flex flex-row justify-between items-center">
					<p className="text-muted-foreground">Telefone {index + 1}:</p>
					<p>{phone.number}</p>
				</div>
			))}
			<div className="mt-2">
				<EditCustomerDialog />
			</div>
		</div>
	)
}
