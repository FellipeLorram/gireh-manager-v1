import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { customerPageOrderColumnDef } from "../tables/order-column-def";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "../tables/table-raw";
import { Skeleton } from "@/components/ui/skeleton";

export function CustomerOrdersList() {
	const { customerid } = useRouter().query;
	const { data } = api.order.listCustomerOrders.useQuery({
		customerId: customerid as string,
	});

	if(!data) return <Skeleton className="w-full h-64" />

	return (
		<Card className='mt-4'>
			<CardHeader className='flex justify-between items-center flex-row'>
				<CardTitle>
					Compras
				</CardTitle>
				<Link
					className={buttonVariants({
						variant: 'secondary',
					})}
					href={`/customers/${customerid as string}/new-order`}
				>
					Adicionar
				</Link>
			</CardHeader>
			<CardContent>
				<DataTable
					data={data}
					columns={customerPageOrderColumnDef}
				/>
			</CardContent>
		</Card>
	)
}
