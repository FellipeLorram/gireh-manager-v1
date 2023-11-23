import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type Appointment } from "@prisma/client";
import { type CellContext, type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const customerPageAppointmentColumnDef: ColumnDef<Appointment>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Data',
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			return date.toLocaleDateString();
		},
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: ({ row }) => <Link
			className={buttonVariants({
				variant: 'ghost',
			})}
			href={`/appointments/${row.original.id}`}
		>
			Ver consulta
		</Link>,
	},
];


function DropdownCell({ row }: CellContext<Appointment, unknown>) {
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
					<Link href={`/customers/${row.original.customerId}/new-order?appointmentid=${row.original.id}`}>
						Seguir para Venda
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className='text-sm p-2 px-3 cursor-pointer'
				>
					<Link href={`/appointments/${row.original.id}`}>
						Ver Consulta
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>

	)
}

export const AppointmentColumnDef: ColumnDef<Appointment>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Data',
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			const today = new Date();
			
			if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
				return 'Hoje';
			}
			
			return date.toLocaleDateString();
		},
	},
	{
		accessorKey: 'customerName',
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
		cell: ({ row }) => <Link href={`/appointments/${row.original.id}`}>{row.original.customerName}</Link>,
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: DropdownCell,
	},
];
