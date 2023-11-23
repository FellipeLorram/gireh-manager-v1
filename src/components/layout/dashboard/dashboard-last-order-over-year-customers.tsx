import { api } from "@/utils/api";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export function DashboardOrderOverAnYear() {
	const { data } = api.reports.lastOrderOverAnYearCustomers.useQuery();

	return (
		<div className="border rounded p-4 w-full">
			<p className="mb-4">
				Última compra há mais de um ano
			</p>

			<Table>
				<TableCaption className="text-sm">Clientes que não compram há mais de um ano</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Cliente</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((customer) => (
						<TableRow key={customer.id}>
							<TableCell>
								{customer.name}
							</TableCell>
						
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}