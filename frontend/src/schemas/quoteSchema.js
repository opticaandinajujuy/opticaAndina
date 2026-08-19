import { z } from 'zod';

const argPhoneRegex = /^(\+?54)?\s?9?\s?\d{2,4}[\s-]?\d{6,8}$/;

export const quoteSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  phone: z.string().regex(argPhoneRegex, 'Ingresá un teléfono válido'),
  email: z.string().email('Ingresá un email válido'),
  consultationType: z.enum(['sol', 'contacto', 'receta', 'otro']).default('otro'),
  message: z.string().min(5, 'Contanos brevemente tu consulta'),
});
