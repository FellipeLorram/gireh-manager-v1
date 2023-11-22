import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
	const { message, customerid } = useRouter().query;
	const initialText = decodeURIComponent(message as string).replace(/\+/g, ' ');
	const [text, setText] = useState<string>(initialText);

	const { data: customer } = api.customer.get.useQuery({
		// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
		id: customerid as string,
	}, {
		enabled: !!customerid,
		refetchOnWindowFocus: true,
	});

	return (
		<div className="mx-auto w-11/12 max-w-3xl min-h-screen flex flex-col items-start justify-start py-4">
			<div className="w-full flex flex-row">
				<Link href={`/customers/${customer?.id}`}>
					<ArrowLeftCircle className="w-8 h-8 stroke-muted-foreground hover:stroke-foreground duration-200" />
				</Link>

				<h1 className="text-xl font-bold text-center mx-auto">{customer?.name}</h1>

			</div>
			<Label className="mt-8 w-full text-lg">
				Mensagem
				<Textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="mt-2 resize-none"
				/>
			</Label>

			<div className="w-full flex flex-wrap gap-4 mt-4">
				{customer?.Phone.map((phone) => (
					<Link
						className={buttonVariants({
							variant: 'secondary',
							className: 'w-full md:w-auto',
						})}
						target="_blank"
						href={`https://wa.me/+55${phone.number}?text=${encodeURIComponent(text)}`}
						key={phone.id}
					>
						Enviar para {formatPhoneNumber(phone.number)}
					</Link>
				))}


				{customer?.Phone.length === 0 && (
					<p>
						Esse cliente não possui nenhum telefone cadastrado.
					</p>
				)}
			</div>
		</div>
	)
}
