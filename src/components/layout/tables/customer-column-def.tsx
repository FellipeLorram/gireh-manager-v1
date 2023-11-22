import { type CellContext, type ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import { api } from "@/utils/api";
import Link from "next/link";
import { type Customer } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/router";

function CustomerColumnDefDropdownCell({ row }: CellContext<Customer, unknown>) {
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
		}
	},
	{
		id: "name",
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Nome
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
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
		cell: CustomerColumnDefDropdownCell,
	},
]


function CustomerInLineColumnDefActionCell({ row }: CellContext<Customer, unknown>) {
	const { reload } = useRouter();
	const { toast } = useToast();
	const { mutate } = api.customer.update.useMutation({
		onSuccess: () => {
			toast({
				title: 'Cliente removido da fila de exame',
				action: <ToastAction onClick={reload} altText="Atualizar Página">Atualizar Página</ToastAction>
			})
		}
	});

	const message = encodeURIComponent('Oi, tudo bem? Não esqueça do seu exame de vista hoje. O exame vai das 14:30h até as 18:30h.');

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
					<Link href={`/customers/${row.original.id}/send-message?message=${message}`}>
						Enviar Mensagem
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => mutate({ id: row.original.id, inLine: false })}
					className='text-sm p-2 px-3 cursor-pointer'
				>
					Remover da Fila
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const customerInLineColumnDef: ColumnDef<Customer>[] = [
	{
		id: "name",
		accessorKey: "name",
		header: "Posição",
		cell: ({ row }) => row.index + 1,
	},
	{
		id: "name",
		accessorKey: "name",
		header: "Nome",
		cell: ({ row }) => <Link href={`/customers/${row.original.id}/new-appointment`}>{row.original.name}</Link>,
	},
	{
		accessorKey: "actions",
		header: '',
		cell: CustomerInLineColumnDefActionCell,
	},
]
