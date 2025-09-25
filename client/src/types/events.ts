import type z from 'zod';
import type { createEventSchema } from '../lib/validations/eventSchema';

export type Event = z.infer<typeof createEventSchema> & { _id: string };
