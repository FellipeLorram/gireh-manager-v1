import { z } from "zod";

export const customerFormSchema = z.object({
	name: z.string().min(3, 'Nome inválido'),
	phone: z.array(z.object({
		number: z.string().transform((value) => value.match(/\d+/g)?.join('') ?? ''),
		id: z.string().optional(),
	})).optional(),
	birthDate: z.string().optional(),
	address: z.string().optional(),
	inLine: z.boolean().optional(),
});

export type CustomerFormSchema = z.infer<typeof customerFormSchema>;
