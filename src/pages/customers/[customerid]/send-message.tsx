import { CentralizedLayout } from "@/components/layout/centralized-layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { CircleDashedIcon } from "lucide-react";
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
		<CentralizedLayout>
			<Card>
				<CardHeader>
					<CardTitle>
						Enviar Mensagem
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Label className="w-full">
						Mensagem
						<Textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="mt-2 resize-none"
						/>
					</Label>

					<div className="w-full flex flex-wrap gap-4 mt-4">
						{!customer && <Button
							variant="secondary"
							disabled
							className="w-full md:w-60"
						>
							<CircleDashedIcon className="animate-spin h-4 w-4" />
						</Button>}

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
				</CardContent>
			</Card>
		</CentralizedLayout>
	)
}
