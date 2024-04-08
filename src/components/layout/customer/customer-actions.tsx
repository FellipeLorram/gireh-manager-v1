import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/utils/api';
import { CircleDashed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CustomerActions() {
	const { toast } = useToast();
	const { customerid } = useRouter().query;
	const { customer } = api.useUtils();
	const { mutate, isLoading } = api.customer.appoinmentLineToggle.useMutation({
		onSuccess: async ({ inLine }) => {
			toast({
				title: inLine
					? 'Cliente adicionado a fila de exame'
					: 'Cliente removido da fila de exame',
			});
			await customer.listCustomersInLine.invalidate();
		}
	});

	return (
		<div className="border rounded-md p-4 flex flex-wrap gap-4 w-full mt-4 bg-card">
			<Link
				className={buttonVariants({
					variant: 'secondary',
					className: 'w-full md:w-auto',
				})}
				href={`/customers/${customerid as string}/send-message?message=`}
			>
				Enviar Mensagem
			</Link>

			<Button
				disabled={isLoading}
				variant='secondary'
				className='w-full md:w-auto'
				onClick={() => mutate({ id: customerid as string })}
			>
				{isLoading && <CircleDashed className='animate-spin' size={24} />}
				Adicionar na Fila de Exame
			</Button>

			<Link
				className={buttonVariants({
					variant: 'secondary',
					className: 'w-full md:w-auto',
				})}
				href={`/customers/${customerid as string}/edit`}
			>
				Editar
			</Link>
		</div>
	)
}
