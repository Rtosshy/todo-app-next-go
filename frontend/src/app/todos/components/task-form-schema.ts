import { z } from 'zod'

export const taskFormSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
  status: z.enum(['todo', 'inProgress', 'done', 'archive', 'pending']),
  deadline: z.string().optional(),
})
