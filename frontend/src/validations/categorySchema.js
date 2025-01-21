import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'The name must be between 1 and 50 characters long')
    .max(50, 'The name must be between 1 and 50 characters long')
    .trim(),
  color: z
    .string()
    .trim(),
});
