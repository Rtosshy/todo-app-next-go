import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Task, StatusName } from '@/gen/api-client'
import InputForm from '@/app/ui/input-form'
import SelectForm from '@/app/ui/select-form'
import Button from '@/app/ui/button'

const editTaskFormSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
  status: z.enum(['todo', 'inProgress', 'done', 'archive', 'pending']),
})

type EditTaskFormData = z.infer<typeof editTaskFormSchema>

const statusOptions = [
  { value: StatusName.todo, label: 'To Do' },
  { value: StatusName.inProgress, label: 'In Progress' },
  { value: StatusName.done, label: 'Done' },
  { value: StatusName.archive, label: 'Archive' },
  { value: StatusName.pending, label: 'Pending' },
]

interface EditTaskModalProps {
  task: Task
  onSave: (taskId: number, name: string, status: StatusName) => void
  onCancel: () => void
  isLoading: boolean
}

export default function EditTaskModal({ task, onSave, onCancel, isLoading }: EditTaskModalProps) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: task.name,
      status: task.status.name,
    },
  })

  useEffect(() => {
    reset({
      name: task.name,
      status: task.status.name,
    })
  }, [task, reset])

  const onSubmit = (data: EditTaskFormData) => {
    onSave(task.id, data.name, data.status)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Task Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputForm
                  value={field.value}
                  onChange={(value: string) => field.onChange(value)}
                  placeholder="task name"
                />
              )}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectForm
                  value={field.value}
                  onChange={(value: string) => field.onChange(value)}
                  options={statusOptions}
                />
              )}
            />
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>
          <div className="flex gap-2 justify-end">
            <Button name="Cancel" onClick={onCancel} loading={false} />
            <Button name="Save" onClick={handleSubmit(onSubmit)} loading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  )
}
