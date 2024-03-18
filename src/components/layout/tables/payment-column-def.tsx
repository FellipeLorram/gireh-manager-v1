import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpDown, MoreVertical, PenLine, XCircle } from "lucide-react";
import { type Payments } from "@prisma/client";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";

import { api } from "@/utils/api";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const paymentType = {
	debit_card: 'Cartão de Débito',
	credit_card: 'Cartão de Crédito',
	pix: 'Pix',
	money: 'Dinheiro',
}

const Actions = ({ row }: CellContext<Payments, unknown>) => {
	const { toast } = useToast();
	const { order } = api.useUtils();
	const {push} = useRouter();
	const { mutate } = api.payment.delete.useMutation({
		onSuccess: async () => {
			toast({
				title: 'Pagamento removido',
			});
			await order.get.invalidate();
		}
	});

	return <DropdownMenu>
		<DropdownMenuTrigger>
			<MoreVertical className="w-5 stroke-muted-foreground" />
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuItem
				onClick={() => push(`/orders/${row.original.orderId}/payments/${row.original.id}`)}
				className="w-full cursor-pointer"
			>
				<PenLine className="w-4 h-4 mr-2 stroke-current" />
				Editar
			</DropdownMenuItem>
			<DropdownMenuItem
				onClick={() => mutate({ id: row.original.id })}
				className="w-full cursor-pointer"
			>
				<XCircle className="w-4 h-4 mr-2 stroke-red-500" />
				Remover pagamento
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
}

export const OrderPagePaymentColumnDef: ColumnDef<Payments>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Data',
		cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('pt-BR'),
	},
	{
		accessorKey: 'amount',
		header: 'Valor',
		cell: ({ row }) => Number(row.original.amount).toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}),
	},
	{
		accessorKey: 'type',
		header: 'Método',
		cell: ({ row }) => paymentType[row.original.type as keyof typeof paymentType],
	},
	{
		accessorKey: 'installments',
		header: 'Parcelas',
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: Actions
	}
]


export const PaymentColumnDef: ColumnDef<Payments>[] = [
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Data
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			return date.toLocaleDateString();
		},
	},
	{
		accessorKey: 'amount',
		header: 'Valor',
		cell: ({ row }) => Number(row.original.amount).toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}),
	},
	{
		accessorKey: 'type',
		header: 'Método',
		cell: ({ row }) => paymentType[row.original.type as keyof typeof paymentType],
	},
	{
		accessorKey: 'installments',
		header: 'Parcelas',
	},
	{
		accessorKey: 'orderId',
		header: 'Venda',
		cell: ({ row }) => <Link
			href={`/orders/${row.original.orderId}`}
			className={buttonVariants({ variant: 'outline' })}
		>
			Ver venda
		</Link>
	}
]
