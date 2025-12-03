import { Control, Controller, FieldErrors } from 'react-hook-form'
import { TaskFormData } from '../types'
import { statusOptions } from './constants'
import InputForm from '@/app/ui/input-form'
import SelectForm from '@/app/ui/select-form'

interface TaskFormFieldsProps {
  control: Control<TaskFormData>
  errors: FieldErrors<TaskFormData>
}

export default function TaskFormFields({ control, errors }: TaskFormFieldsProps) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Task Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputForm
              value={field.value ?? ''}
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
              value={field.value ?? ''}
              onChange={(value: string) => field.onChange(value)}
              options={statusOptions}
            />
          )}
        />
        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Deadline</label>
        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <InputForm
              value={field.value ?? ''}
              onChange={(value: string) => field.onChange(value)}
              placeholder="deadline"
              type="date"
            />
          )}
        />
        {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
      </div>
    </>
  )
}
