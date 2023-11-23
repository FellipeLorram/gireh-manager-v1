import Link from "next/link";
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

export function DashboardBirthdaysCustomers() {
	const { data: birthdayCustomers } = api.reports.birthdayCustomers.useQuery();
	const { data: ageAvarege } = api.reports.ageAvarege.useQuery();

	return (
		<div className="border rounded p-4 w-full">
			<p className="mb-4">
				Aniversariantes do mês
			</p>
			<Table>
				<TableCaption className="text-sm">
					A média de idade dos clientes é de {ageAvarege} anos
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Data</TableHead>
						<TableHead>Cliente</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{birthdayCustomers?.map((customer) => (
						<TableRow key={customer.id}>
							<TableCell className="font-medium">
								{customer.birthDate?.getDate() === new Date().getDate()
									? '🥳🎉 Hoje'
									: customer.birthDate?.toLocaleDateString('pt-BR')}
							</TableCell>
							<TableCell>
								<Link href={`/customers/${customer.id}`}>
									{customer.name}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

		</div>
	)
}