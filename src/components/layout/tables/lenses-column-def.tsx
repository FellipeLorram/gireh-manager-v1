import { type OrderFormFields, type LensesFields } from "@/components/forms/order-form/form-schema";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type Lenses } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
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
					const newLenses = lenses.filter((len) => len.id !== row.original.id);
					form.setValue('lenses', newLenses);
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
