import { useMemo } from "react";
import { type OrderFormFields } from "./form-schema";
import { type UseFormReturn } from 'react-hook-form';
import { LensesDrawer } from "./lenses-drawer";
import { DataTable } from "@/components/layout/tables/table-raw";
import { MakeLensesColumnDef } from "@/components/layout/tables/lenses-column-def";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function Lenses({ form }: Props) {
	const lenses = form.watch('lenses');
	const columns = useMemo(() => MakeLensesColumnDef({ form }), [form]);

	return (
		<Card>
			<CardHeader className='flex-row justify-between items-center'>
				<CardTitle>
					Lentes
				</CardTitle>
				<LensesDrawer form={form} />
			</CardHeader>

			<CardContent>
				<div className='w-full mb-2'>
					<DataTable
						columns={columns}
						data={lenses ?? []}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
