import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Task, StatusName, Deadline } from '@/gen/api-client'
import Button from '@/app/ui/button'
import TaskFormFields from './task-form-fields'
import { taskFormSchema } from './task-form-schema'
import { TaskFormData } from '../types'

type TaskModalProps =
  | {
      mode: 'create'
      task?: never
      onSave: (name: string, status: StatusName, deadline: Deadline | undefined) => void
      onCancel: () => void
      isLoading: boolean
    }
  | {
      mode: 'edit'
      task: Task
      onSave: (taskId: number, name: string, status: StatusName, deadline: Deadline | undefined) => void
      onCancel: () => void
      isLoading: boolean
    }

export default function TaskModal(props: TaskModalProps) {
  const { mode, onSave, onCancel, isLoading } = props
  const task = mode === 'edit' ? props.task : undefined

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: task?.name ?? '',
      status: task?.status.name ?? StatusName.todo,
      deadline: task?.deadline ?? undefined,
    },
  })

  const onSubmit = (data: TaskFormData) => {
    if (mode === 'create') {
      onSave(data.name, data.status, data.deadline)
    } else {
      onSave(props.task.id, data.name, data.status, data.deadline)
    }
  }

  const title = mode === 'create' ? 'Create Task' : 'Edit Task'
  const buttonLabel = mode === 'create' ? 'Create' : 'Save'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TaskFormFields control={control} errors={errors} />
          <div className="flex gap-2 justify-end">
            <Button name="Cancel" onClick={onCancel} loading={false} />
            <Button name={buttonLabel} onClick={handleSubmit(onSubmit)} loading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  )
}
