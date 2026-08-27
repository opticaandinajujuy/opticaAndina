import { z } from 'zod';

const emptyToUndefined = (val) => (val === '' || val === null ? undefined : val);

export const productSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  description: z.string().optional(),
  category: z.enum(['sol', 'contacto', 'receta', 'accesorios']),
  subcategory: z.preprocess(
    emptyToUndefined,
    z.enum(['panos', 'colgantes', 'liquidos']).optional()
  ),
  price: z.preprocess(emptyToUndefined, z.coerce.number().nonnegative().optional()),
  measurements: z.string().optional(),
  features: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  active: z.boolean().default(true),
  stock: z.preprocess(emptyToUndefined, z.coerce.number().int().nonnegative().optional()),
});
