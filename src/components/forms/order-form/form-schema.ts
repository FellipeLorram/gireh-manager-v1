import { z } from 'zod';

export const FrameSchema = z.object({
	name: z.string().min(3, { message: 'Nome inválido' }),
	price: z.string().min(0, { message: 'Preço inválido' }),
	height: z.string().optional(),
	reference: z.string().optional(),
	image_url: z.string().optional(),
	supplier: z.string().optional(),
	id: z.string().optional(),
});

export type FrameFields = z.infer<typeof FrameSchema>;

export const LensesSchema = z.object({
	name: z.string(),
	price: z.string().min(0),
	id: z.string(),
});

export type LensesFields = z.infer<typeof LensesSchema>;

const PaymentSchema = z.object({
	amount: z.number(),
	type: z.string(),
	installments: z.number(),
	id: z.string().optional(),
});

export const OrderFormSchema = z.object({
	esf_right: z.string().regex(/^[+-]\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	cil_right: z.string().regex(/^[-]?\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	axle_right: z.string()
		.optional(),

	esf_left: z.string().regex(/^[+-]\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	cil_left: z.string().regex(/^[-]?\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),
	axle_left: z.string()
		.optional(),

	add: z.string().regex(/^[+]?\d*[\.,]?(?:00|25|50|75)$/, "Grau inválido").optional(),

	dnp_right: z.string().transform(v => v.replace(',', '.')).optional(),
	dnp_left: z.string().transform(v => v.replace(',', '.')).optional(),

	frame: z.array(FrameSchema).optional(),
	lenses: z.array(LensesSchema).optional(),

	discount: z.string().optional(),
	total: z.number({
		invalid_type_error: 'Valor total é obrigatório',
		required_error: 'Valor total é obrigatório'
	}).min(1, { message: 'Valor total inválido' }),

	payment: z.array(PaymentSchema).optional(),

	observation: z.string().optional(),

}).refine(({ cil_right, axle_right }) => !(cil_right && !axle_right),
	{ path: ['axle_right'], message: 'Cilindro OD requer eixo' })
	.refine(({ cil_left, axle_left }) => !(cil_left && !axle_left),
		{ path: ['axle_left'], message: 'Cilindro OE requer eixo' })
	.refine(({ discount, total }) => !(Number(discount) > total), { path: ['discount'], message: 'Desconto maior que total' })
	.refine(({ discount, total }) => !(Number(discount) === total), { path: ['discount'], message: 'Desconto inválido' })

export type OrderFormFields = z.infer<typeof OrderFormSchema>;
