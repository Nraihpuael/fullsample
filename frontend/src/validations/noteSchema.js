import { z } from 'zod';

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, 'The name must be between 1 and 50 characters long')
    .max(50, 'The name must be between 1 and 50 characters long')
    .trim(),
  content: z.string().trim(),
  color: z.string().trim(),
});
