import { Task } from '@/gen/api-client'
import { taskFormSchema } from '../components/task-form-schema'
import { z } from 'zod'

export type ModalState = { mode: 'closed' } | { mode: 'create' } | { mode: 'edit'; task: Task }

export type TaskFormData = z.infer<typeof taskFormSchema>
