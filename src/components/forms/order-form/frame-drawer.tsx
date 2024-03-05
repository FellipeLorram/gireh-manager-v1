import { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type UseFormReturn, useForm } from 'react-hook-form'
import { type FrameFields, FrameSchema, type OrderFormFields } from './form-schema'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ResponsiveDrawer } from '@/components/ui/responsive-drawer';


interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function FrameDrawer({
	form,
}: Props) {
	const [open, setOpen] = useState(false);
	const frameForm = useForm<FrameFields>({
		resolver: zodResolver(FrameSchema),
		defaultValues: {
			name: '',
			reference: '',
			supplier: '',
			image_url: '',
			price: '',
			height: '',
		},
	});

	const onSubmit = useCallback((data: FrameFields) => {
		form.setValue('frame', [...(form.getValues().frame ?? []), {
			...data,
			id: Math.random().toString(36).slice(2, 11),
		}]);
		frameForm.reset();
	}, [form, frameForm]);

	return (
		<ResponsiveDrawer
			title="Adicionar Armação"
			open={open}
			setOpen={setOpen}
			trigger={<Button variant="secondary">
				Adicionar
			</Button>}
			content={<Form {...frameForm}>
				<div className='space-y-4 p-4'>
					<FormField
						control={frameForm.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Marca</FormLabel>
								<FormControl>
									<Input autoComplete='off' placeholder="marca" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={frameForm.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Preço</FormLabel>
								<FormControl>
									<Input placeholder="0.00" type='number' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={frameForm.control}
						name="height"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Altura</FormLabel>
								<FormControl>
									<Input placeholder="0" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={frameForm.control}
						name="reference"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Referência</FormLabel>
								<FormControl>
									<Input placeholder="00-000" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={frameForm.control}
						name="supplier"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Fornecedor</FormLabel>
								<FormControl>
									<Input placeholder="Areq" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button onClick={frameForm.handleSubmit(onSubmit)} className="w-full">
						Adicionar
					</Button>
				</div>
			</Form>
			}
		/>
	)
}
