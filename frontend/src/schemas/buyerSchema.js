import { z } from 'zod';

const argPhoneRegex = /^(\+?54)?\s?9?\s?\d{2,4}[\s-]?\d{6,8}$/;

export const buyerSchema = z.object({
  buyerName: z.string().min(2, 'Ingresá tu nombre completo'),
  buyerPhone: z.string().regex(argPhoneRegex, 'Ingresá un teléfono válido'),
});
