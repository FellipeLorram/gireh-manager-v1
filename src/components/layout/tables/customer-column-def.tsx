import { type CellContext, type ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import { api } from "@/utils/api";
import Link from "next/link";
import { type Customer } from "@prisma/client";


function DropdownCell({ row }: CellContext<Customer, unknown>) {
	const { id, inLine } = row.original
	const { toast } = useToast();
	const { mutate } = api.customer.update.useMutation({
		onSuccess: () => {
			toast({
				title: 'Cliente adicionado a fila de exame',
			})
		}
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className='group'
			>
				<MoreHorizontal
					className='stroke-muted-foreground group-hover:stroke-foreground duration-200'
					size={20}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					asChild
					className='text-sm p-2 px-3 cursor-pointer'
				>
					<Link href={`/customers/${id}/new-order`}>
						Seguir para Venda
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						mutate({ id, inLine: !inLine });
					}}
					className='text-sm p-2 px-3 cursor-pointer'
				>
					{inLine ? 'Remover da fila' : 'Adicionar a fila'}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>

	)
}

export const customerColumnDef: ColumnDef<Customer>[] = [
	{
		accessorKey: "createdAt",
		header: "Data",
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			return date.toLocaleDateString();
		}
	},
	{
		id: "name",
		accessorKey: "name",
		header: "Nome",
		cell: ({ row }) => <Link href={`/customers/${row.original.id}`}>{row.original.name}</Link>,
		filterFn: (row, _, filterValue) => {
			const name = row.original.name.toLowerCase();
			const filter = filterValue as string;
			return name.startsWith(filter.toLowerCase());
		}
	},
	{
		accessorKey: "actions",
		header: '',
		cell: DropdownCell,
	},
]
