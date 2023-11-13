import { z } from 'zod';

export const FrameSchema = z.object({
	name: z.string().min(3, {message: 'Nome inválido'}),
	price: z.string().min(0, {message: 'Preço inválido'}),
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
	id: z.string().optional(),
});

export type LensesFields = z.infer<typeof LensesSchema>;

const ContactLensesSchema = z.object({
	name: z.string(),
	price: z.number(),
	id: z.string().optional(),
});

const PaymentSchema = z.object({
	amount: z.number(),
	type: z.string(),
	installments: z.number(),
	id: z.string().optional(),
});

const OPTIONAL_STRING_TO_NUMBER = z.string().or(z.number()).transform(value => value && Number(value)).optional();

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

	dnp_right: OPTIONAL_STRING_TO_NUMBER,
	dnp_left: OPTIONAL_STRING_TO_NUMBER,

	frame: z.array(FrameSchema).optional(),
	lenses: z.array(LensesSchema).optional(),
	contactLenses: z.array(ContactLensesSchema).optional(),

	total: z.number({
		invalid_type_error: 'Valor total é obrigatório',
		required_error: 'Valor total é obrigatório'
	}),

	payment: PaymentSchema,

	observation: z.string().optional(),

}).refine(({ cil_right, axle_right }) => !(cil_right && !axle_right),
	{ path: ['axle_right'], message: 'Cilindro OD requer eixo' })
	.refine(({ cil_left, axle_left }) => !(cil_left && !axle_left), { path: ['axle_left'], message: 'Cilindro OE requer eixo' })

export type OrderFormFields = z.infer<typeof OrderFormSchema>;
