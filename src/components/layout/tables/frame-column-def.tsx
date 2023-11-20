import { type OrderFormFields, type FrameFields } from "@/components/forms/order-form/form-schema";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type Frame } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { type UseFormReturn } from "react-hook-form";

export const OrderPageFrameColumnDef: ColumnDef<Frame>[] = [
	{
		accessorKey: 'image_url',
		header: 'Imagem',
		cell: ({ row }) => {
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

				return (
					<DropdownMenu>
						<DropdownMenuTrigger
							className='group'
						>
							<MoreVertical
								className='stroke-muted-foreground group-hover:stroke-foreground duration-200'
								size={20}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								asChild
							>
								<Button className="w-full" variant="outline" onClick={handleRemove}>
									Remover
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			}
		}
	]
}
