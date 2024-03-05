import Link from "next/link";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { type Payments } from "@prisma/client";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";

const paymentType = {
	debit_card: 'Cartão de Débito',
	credit_card: 'Cartão de Crédito',
	pix: 'Pix',
	money: 'Dinheiro',
}

const Actions = ({ row }: CellContext<Payments, unknown>) => {
	const { toast } = useToast();
	const { payment } = api.useUtils();
	const { mutate } = api.payment.delete.useMutation({
		onSuccess: async () => {
			toast({
				title: 'Pagamento removido',
			});
			await payment.list.invalidate();
		}
	});

	return <DropdownMenu>
		<DropdownMenuTrigger>
			<MoreVertical className="w-5 stroke-muted-foreground" />
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuItem asChild>
				<Link
					className={buttonVariants({
						variant: 'outline',
						className: "w-full mb-1 cursor-pointer"
					})}
					href={`/orders/${row.original.orderId}/payments/${row.original.id}`}>
					Editar
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem className="opacity-70" asChild>
				<Button
					onClick={() => mutate({ id: row.original.id })}
					className="w-full cursor-pointer"
					variant="destructive">
					Remover pagamento
				</Button>
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
