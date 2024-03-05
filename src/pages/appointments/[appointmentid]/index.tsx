import Link from "next/link";
import CustomerInfo from "@/components/layout/customer-info";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { CentralizedLayout } from "@/components/layout/centralized-layout";

export default function Page() {
	const { appointmentid } = useRouter().query;
	const { data } = api.appointment.get.useQuery({
		id: appointmentid as string,
	}, {
		enabled: !!appointmentid,
	});

	return (
		<CentralizedLayout>
			<CustomerInfo id={data?.customerId} />
			<div className="w-full space-y-4">
				<div className="border rounded-md p-4 w-full">
					<p className='font-semibold'>Exame</p>
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead />
								<TableHead>Esf</TableHead>
								<TableHead>Cil</TableHead>
								<TableHead>Eixo</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>OD</TableCell>
								<TableCell>{data?.esf_right}</TableCell>
								<TableCell>{data?.cil_right}</TableCell>
								<TableCell>{data?.axle_right}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>OD</TableCell>
								<TableCell>{data?.esf_left}</TableCell>
								<TableCell>{data?.cil_left}</TableCell>
								<TableCell>{data?.axle_left}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>ADD</TableCell>
								<TableCell />
								<TableCell>{data?.add}</TableCell>
								<TableCell />
							</TableRow>
						</TableBody>
					</Table>
				</div>

				<div className="border rounded-md p-4">
					<p className='font-semibold'>Anamnese</p>
					<p className='mt-2'>{data?.anamnesis}</p>
				</div>

				<div className="border rounded-md p-4">
					<p className='font-semibold'>Observações</p>
					<p className='mt-2'>{data?.observation}</p>
				</div>
			</div>
			
			<div className="border rounded-md p-4 flex flex-wrap gap-4 w-full">
				<Link
					className={buttonVariants({
						className: 'w-full md:w-auto',
					})}
					href={`/appointments/${appointmentid as string}/edit`}
				>
					Editar
				</Link>
			</div>
		</CentralizedLayout>
	)
}
