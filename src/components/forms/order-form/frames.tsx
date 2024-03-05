import React, { useMemo } from 'react'
import { type UseFormReturn } from 'react-hook-form';
import { type OrderFormFields } from './form-schema';
import { FrameDrawer } from './frame-drawer';
import { DataTable } from '@/components/layout/tables/table-raw';
import { MakeFrameColumnDef } from '@/components/layout/tables/frame-column-def';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function Frames({ form }: Props) {
	const frames = form.watch('frame');
	const columns = useMemo(() => MakeFrameColumnDef({ form }), [form]);

	return (
		<Card>
			<CardHeader className='flex-row justify-between items-center'>
				<CardTitle>
					Armações
				</CardTitle>
				<FrameDrawer form={form} />
			</CardHeader>

			<CardContent>
				<div className='w-full mb-2'>
					<DataTable
						columns={columns}
						data={frames ?? []}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
