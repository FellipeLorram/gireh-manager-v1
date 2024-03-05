import { Button, buttonVariants } from "@/components/ui/button";
import { type Order } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

type Situation = 'SEPARATING' | 'WAITING_LENSES' | 'WAITING_FRAME' | 'ASSEMBLING' | 'READY' | 'DELIVERED';
const situationMap = {
	'SEPARATING': 'Separando',
	'WAITING_LENSES': 'Aguardando Lentes',
	'WAITING_FRAME': 'Aguardando Armação',
	'ASSEMBLING': 'Montando',
	'READY': 'Pronto',
	'DELIVERED': 'Entregue',
}


export const customerPageOrderColumnDef: ColumnDef<Order>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Data',
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			return date.toLocaleDateString();
		},
	},
	{
		accessorKey: 'service_order',
		header: 'OS',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			return row.original.status ? (
				<p className="text-green-500">Pago</p>
			) : (
				<p className="text-red-500">Não pago</p>
			);
		},
	},
	{
		accessorKey: 'total',
		header: 'Total',
		cell: ({ row }) => {
			return row.original.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
		},
	},
	{
		accessorKey: 'actions',
		header: '',
		cell: ({ row }) => <Link
			href={`/orders/${row.original.id}`}
			className={buttonVariants({
				variant: 'outline',
			})}
		>
			Ver venda
		</Link>,
	}
];

export const OrderColumnDef: ColumnDef<Order>[] = [
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
		accessorKey: 'service_order',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					OS
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'customer_name',
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
		cell: ({ row }) => <Link href={`/orders/${row.original.id}`}>{row.original.customer_name}</Link>,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			return row.original.status ? (
				<p className="text-green-500">Pago</p>
			) : (
				<p className="text-red-500">Não pago</p>
			);
		},
	},
	{
		accessorKey: 'total',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Total
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			return row.original.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
		},
	}
];

export const dashboardPageOrderByStatusColumnDef :ColumnDef<Order>[] = [
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
		accessorKey: 'service_order',
		header: "OS"
	},
	{
		accessorKey: 'situation',
		header: "Situação",
		cell: ({ row }) => situationMap[row.original.situation as Situation],
	}
] 

export const dailyOrderColumnDef: ColumnDef<Order>[] = [
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
		accessorKey: 'service_order',
		header: "OS"
	},
	{
		accessorKey: 'customer_name',
		header: "Nome",
		cell: ({ row }) => <Link href={`/orders/${row.original.id}`}>{row.original.customer_name}</Link>,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			return row.original.status ? (
				<p className="text-green-500">Pago</p>
			) : (
				<p className="text-red-500">Não pago</p>
			);
		},
	},
	{
		accessorKey: 'total',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Total
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			return row.original.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
		},
	}
];