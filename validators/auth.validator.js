import { z } from 'zod';

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, 'Name must be al least 3 characters'),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export { registerSchema };
