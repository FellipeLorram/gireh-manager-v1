import { buttonVariants } from "@/components/ui/button";
import { type Order } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
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
			href={`/customers/${row.original.customerId}/orders/${row.original.id}`} 
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
		accessorKey: 'customer_name',
		header: 'Nome',
		cell: ({ row }) => <Link href={`/customers/${row.original.customerId}/orders/${row.original.id}`}>{row.original.customer_name}</Link>,
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
	}
];
