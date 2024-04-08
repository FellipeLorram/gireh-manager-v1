import { api } from "@/utils/api";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { Skeleton } from "../../ui/skeleton";


interface Props {
	id: string | undefined;
}

export default function CustomerInfo({ id }: Props) {
	const { data } = api.customer.get.useQuery({
		id: id!,
	}, {
		enabled: !!id,
	});

	if (!data) return <Skeleton className="w-full h-[150px]" />

	return (
		<div className='w-full p-2 border rounded-md bg-card'>
			<div className="w-full py-2 px-1 border-b flex flex-row justify-between items-center">
				<p className="text-muted-foreground">Nome:</p>
				<p>{data?.name}</p>
			</div>
			<div className="w-full py-2 px-1 border-b flex flex-row justify-between items-center">
				<p className="text-muted-foreground">Idade:</p>
				<p>{data?.age}</p>
			</div>
			<div className="w-full py-2 px-1 border-b flex flex-row justify-between items-center last:border-none">
				<p className="text-muted-foreground">Endereço:</p>
				<p>{data?.address}</p>
			</div>
			{data?.Phone.map((phone, index) => (
				<div
					key={phone.number}
					className="w-full py-2 px-1 border-b flex flex-row justify-between items-center last:border-none">
					<p className="text-muted-foreground">Telefone {index + 1}:</p>
					<p>{formatPhoneNumber(phone.number)}</p>
				</div>
			))}
		</div>
	)
}


