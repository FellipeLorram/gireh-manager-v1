import React, { useMemo } from 'react'
import { type UseFormReturn } from 'react-hook-form';
import { type OrderFormFields } from './form-schema';
import { FrameDialog } from './frame-dialog';
import { DataTable } from '@/components/layout/tables/table-raw';
import { MakeFrameColumnDef } from '@/components/layout/tables/frame-column-def';

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function Frames({ form }: Props) {
	const frames = form.watch('frame');


	const columns = useMemo(() => MakeFrameColumnDef({ form }), [form]);

	return (
		<div className="w-full border rounded p-4 mt-4">
			<h2 className="text-lg text-foreground mb-2">
				Armações
			</h2>


			<div className='w-full mb-2'>
				<DataTable
					columns={columns}
					data={frames ?? []}
				/>
			</div>

			<FrameDialog form={form} />
		</div>
	)
}
