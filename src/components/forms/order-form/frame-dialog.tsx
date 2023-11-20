import { useCallback, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type UseFormReturn, useForm } from 'react-hook-form'
import { type FrameFields, FrameSchema, type OrderFormFields } from './form-schema'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';


interface Props {
	form: UseFormReturn<OrderFormFields>;
}

export function FrameDialog({
	form,
}: Props) {
	const ref = useRef<HTMLButtonElement>(null);
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
		ref.current?.click();
	}, [form, frameForm]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" className='w-full'>
					Adicionar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Adicionar Armação
					</DialogTitle>
				</DialogHeader>
				<Form {...frameForm}>
					<div className='space-y-4'>
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
						<DialogClose ref={ref} />
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
