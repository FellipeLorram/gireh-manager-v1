import {
	type ColumnDef,
	type SortingState,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	getSortedRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterField?: string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filterField,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			columnFilters,
			sorting,
		},
	})

	return (
		<div className="w-full flex flex-col items-start justify-center gap-2">
			{filterField && (
				<div className="flex flex-row items-center justify-between w-full mb-2">
					<Input
						className="w-full max-w-full"
						placeholder="Buscar..."
						value={(table.getColumn(filterField)?.getFilterValue() as string) ?? ""}
						onChange={(event) => {
							table.getColumn(filterField)?.setFilterValue(event.target.value)
						}}
					/>
				</div>
			)}
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow className="hover:bg-transparent" key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow

								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Nada por aqui...
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{data.length > 10 && (
				<div className="flex flex-row items-center justify-end w-full gap-2">
					<Button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						variant="outline"
						className="flex items-center justify-center"
					>
						<ChevronLeft size={16} />
						<span className="text-sm">Anterior</span>
					</Button>
					<Button
						variant="outline"
						className="flex items-center justify-center"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="text-sm">Próximo</span>
						<ChevronRight size={16} />
					</Button>
				</div>
			)}
		</div>
	)
}
