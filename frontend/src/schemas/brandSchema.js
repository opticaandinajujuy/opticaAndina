import { z } from 'zod';

export const brandSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  logo: z.string().min(1, 'Subí el logo de la marca'),
  active: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
});
