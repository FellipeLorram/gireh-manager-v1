import { z } from "zod";

export const orgFormSchema = z.object({
	name: z.string().min(3, 'Nome inválido'),
	nickName: z.string().optional(),
	printType: z.enum(['fullPage', 'middle', 'small']).optional(),
});

export type OrgFormSchema = z.infer<typeof orgFormSchema>;