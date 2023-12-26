import { api } from "@/utils/api";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

type Situation = 'SEPARATING' | 'WAITING_LENSES' | 'WAITING_FRAME' | 'ASSEMBLING' | 'READY' | 'DELIVERED';

const situationMap = {
	'SEPARATING': 'Separando',
	'WAITING_LENSES': 'Aguardando Lentes',
	'ASSEMBLING': 'Montando',
	'READY': 'Pronto',
	'DELIVERED': 'Entregue',
}

const colorMap = {
	'SEPARATING': 'text-yellow-500',
	'WAITING_LENSES': 'text-yellow-500',
	'ASSEMBLING': 'text-yellow-500',
	'READY': 'text-green-300',
	'DELIVERED': 'text-green-500',
}

export function OrderTracking({ id }: { id: string }) {
	const dialogRef = useRef<HTMLButtonElement>(null);
	const { toast } = useToast();
	const [situation, setSituation] = useState('SEPARATING');
	const { data, refetch } = api.order.get.useQuery({
		id,
	}, {
		enabled: !!id,
		refetchOnWindowFocus: true,
		onSuccess: (data) => {
			setSituation(data?.situation ?? 'SEPARATING');
		}
	});

	const { mutate } = api.order.updateOrderSituation.useMutation({
		onSuccess: async () => {
			toast({
				title: 'Andamento atualizado com sucesso!',
			});
			await refetch();
			dialogRef.current?.click();
		},
	});


	const textColor = colorMap[data?.situation as keyof typeof colorMap];

	return (
		<div className="w-full border rounded-md p-4">
			<p className='font-semibold'>Status</p>
			<div className="mt-2 flex flex-row justify-between items-center">
				<p className={`${textColor}`}>
					{situationMap[data?.situation as keyof typeof situationMap]}
				</p>
				<Dialog>
					<DialogTrigger>
						<Button
							variant="outline"
						>
							Alterar Status
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Alterar Status
							</DialogTitle>
						</DialogHeader>
						<div className="w-full space-y-4 mt-4">
							<Select
								value={situation}
								onValueChange={setSituation}
							>
								<SelectTrigger>
									<SelectValue placeholder="Theme" />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(situationMap).map(([key, value]) => (
										<SelectItem key={key} value={key}>
											{value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Button
								className="w-full"
								onClick={() => {
									mutate({
										id,
										situation: situation as Situation,
									});
								}}
							>
								Alterar
							</Button>
						</div>
						<DialogClose ref={dialogRef} />
					</DialogContent>
				</Dialog>


			</div>
		</div>
	)
}
