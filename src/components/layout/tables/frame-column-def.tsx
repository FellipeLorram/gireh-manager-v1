import { type OrderFormFields, type FrameFields } from "@/components/forms/order-form/form-schema";
import { type Frame } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { XCircle } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

export const OrderPageFrameColumnDef: ColumnDef<Frame>[] = [
	{
		accessorKey: 'image_url',
		header: 'Imagem',
		cell: () => {
			return 'sem imagem'
		},
	},
	{
		accessorKey: 'name',
		header: 'Modelo',
	},
	{
		accessorKey: 'reference',
		header: 'Referência',
	},
	{
		accessorKey: 'price',
		header: 'Preço',
	},
	{
		accessorKey: 'height',
		header: 'Altura',
		cell: ({ row }) => row.original.height
	},
]

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function MakeFrameColumnDef({
	form,
}: Props): ColumnDef<FrameFields>[] {
	return [
		{
			accessorKey: 'image_url',
			header: 'Imagem',
			cell: () => 'sem imagem'
		},
		{
			accessorKey: 'name',
			header: 'Modelo',
		},
		{
			accessorKey: 'reference',
			header: 'Referência',
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
			accessorKey: 'height',
			header: 'Altura',
			cell: ({ row }) => row.original.heightOd + '/' + row.original.heightOe
		},
		{
			accessorKey: 'actions',
			header: '',
			cell: ({ row }) => {
				const handleRemove = () => {
					const frames = form.getValues().frame ?? [];
					const newFrames = frames.filter((frame) => frame.id !== row.original.id);
					form.setValue('frame', newFrames);
				}

				return <XCircle className="stroke-red-500" onClick={handleRemove} />
					
			}
		}
	]
}
