import { type OrderFormFields, type LensesFields } from "@/components/forms/order-form/form-schema";
import { type Lenses } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { XCircle } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function MakeLensesColumnDef({
	form,
}: Props): ColumnDef<LensesFields>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Lente',
		},
		{
			accessorKey: 'price',
			header: 'Preço',
			cell: ({ row }) => Number(row.original.price).toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}),
		},
		{
			accessorKey: 'actions',
			header: '',
			cell: ({ row }) => {
				const handleRemove = () => {
					const lenses = form.getValues().lenses ?? [];
					const newlenses = lenses.filter((l) => l.id !== row.original.id);
					form.setValue('lenses', newlenses);
				}

				return <XCircle className="stroke-red-500" onClick={handleRemove} />
					
			}
		}

	]
}

export const OrderPageLensesColumnDef: ColumnDef<Lenses>[] = [
	{
		accessorKey: 'name',
		header: 'Lente',
	},
	{
		accessorKey: 'price',
		header: 'Preço',
	}
]
