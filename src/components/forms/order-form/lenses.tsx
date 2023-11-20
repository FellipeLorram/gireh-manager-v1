import { useMemo } from "react";
import { type OrderFormFields } from "./form-schema";
import { type UseFormReturn } from 'react-hook-form';
import { LensesDialog } from "./lenses-dialog";
import { DataTable } from "@/components/layout/tables/table-raw";
import { MakeLensesColumnDef } from "@/components/layout/tables/lenses-column-def";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function Lenses({ form }: Props) {
	const frames = form.watch('lenses');
	const columns = useMemo(() => MakeLensesColumnDef({ form }), [form]);

	return (
		<div className="w-full border rounded p-4 mt-4">
			<h2 className="text-lg text-foreground mb-2">
				Lentes
			</h2>

			<div className='w-full mb-2'>
				<DataTable
					columns={columns}
					data={frames ?? []}
				/>
			</div>

			<LensesDialog form={form} />
		</div>
	)
}
