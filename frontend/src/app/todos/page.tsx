'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import PageName from '@/app/ui/page-name'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/app/ui/button'
import { useRouter } from 'next/navigation'
import { getTodoAPI, StatusName, Task } from '@/gen/api-client'
import InputForm from '@/app/ui/input-form'
import SelectForm from '@/app/ui/select-form'
import TasksView from '@/app/ui/tasks-view'
import { ensureCsrfToken } from '@/lib/csrf-store'
import EditTaskModal from '@/app/ui/edit-task-modal'

const createTaskFormSchema = z.object({
  name: z.string().min(1, 'Task name is required'),
  status: z.enum(['todo', 'inProgress', 'done', 'archive', 'pending']),
})

type CreateTaskFormData = z.infer<typeof createTaskFormSchema>

const statusOptions = [
  { value: StatusName.todo, label: 'To Do' },
  { value: StatusName.inProgress, label: 'In Progress' },
  { value: StatusName.done, label: 'Done' },
  { value: StatusName.archive, label: 'Archive' },
  { value: StatusName.pending, label: 'Pending' },
]

export default function Todos() {
  const api = useMemo(() => getTodoAPI(), [])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const onLogout = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await api.postLogout()
      router.push('/')
      console.log('Logout successful!')
    } catch (error) {
      console.error('Logout error:', error)
      setErrorMessage('Failed to logout')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.getAllTasks()
      setTasks(response.data)
      console.log('Fetch tasks successful!')
    } catch (error) {
      console.error('Fetch tasks error:', error)
    } finally {
    }
  }, [api])

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      status: StatusName.todo,
    },
  })

  const name = watch('name')
  const status = watch('status')

  const onCreateTask = async (data: CreateTaskFormData) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await api.createTask({
        kind: 'task',
        name: data.name,
        status: {
          name: data.status,
        },
      })
      fetchTasks()
      console.log('Create task successful!')
    } catch (error) {
      console.error('Create task error:', error)
      setErrorMessage('Failed to create task')
    } finally {
      setIsLoading(false)
    }
  }

  const onEditClick = (task: Task) => {
    setEditingTask(task)
  }

  const onUpdateTask = async (taskId: number, name: string, status: StatusName) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await api.updateTaskById(taskId, {
        kind: 'task',
        name,
        status: { name: status },
      })
      fetchTasks()
      setEditingTask(null)
      console.log('Update task successful!')
    } catch (error) {
      console.error('Update task error:', error)
      setErrorMessage('Failed to update task')
    } finally {
      setIsLoading(false)
    }
  }

  const onCancelEdit = () => {
    setEditingTask(null)
  }

  const onDeleteTask = async (taskId: number) => {
    try {
      await api.deleteTaskById(taskId)
      fetchTasks()
      console.log('Delete task successful!')
    } catch (error) {
      console.error('Delete task error:', error)
    } finally {
    }
  }

  useEffect(() => {
    const loadTasks = async () => {
      await ensureCsrfToken()
      fetchTasks()
    }
    loadTasks()
  }, [fetchTasks])

  return (
    <div>
      <PageName pageName="Todos"></PageName>
      <Button name="Logout" onClick={onLogout} loading={isLoading}></Button>
      <form onSubmit={handleSubmit(onCreateTask)}>
        <div>
          <InputForm
            value={name}
            onChange={(value: string) => setValue('name', value, { shouldValidate: false })}
            placeholder="task name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          <SelectForm
            value={status}
            onChange={(value: string) =>
              setValue('status', value as CreateTaskFormData['status'], { shouldValidate: false })
            }
            options={statusOptions}
          />
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>
        <Button
          name="Create Task"
          onClick={handleSubmit(onCreateTask)}
          loading={isLoading}
        ></Button>
      </form>
      {errorMessage && <div className="text-red-700 p-3 rounded mt-4 mb-4">{errorMessage}</div>}
      <TasksView tasks={tasks} onDelete={onDeleteTask} onEdit={onEditClick} />
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={onUpdateTask}
          onCancel={onCancelEdit}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
