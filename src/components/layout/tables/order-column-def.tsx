import { Button, buttonVariants } from "@/components/ui/button";
import { type Order } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

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
		accessorKey: 'is_paid',
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
				variant: 'ghost',
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
		accessorKey: 'is_paid',
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
