import { useEffect, useState, useCallback, useMemo } from 'react'
import { Deadline, getTodoAPI, StatusName, Task } from '@/gen/api-client'
import { ensureCsrfToken } from '@/lib/csrf-store'
import { ModalState } from '../types'

export function useTodos() {
  const api = useMemo(() => getTodoAPI(), [])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [modalState, setModalState] = useState<ModalState>({ mode: 'closed' })

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.getAllTasks()
      setTasks(response.data)
      console.log('Fetch tasks successful!')
    } catch (error) {
      console.error('Fetch tasks error:', error)
    }
  }, [api])

  const onEditClick = (task: Task) => {
    setModalState({ mode: 'edit', task })
  }

  const onCreateClick = () => {
    setModalState({ mode: 'create' })
  }

  const onCancelModal = () => {
    setModalState({ mode: 'closed' })
  }

  const onCreateTask = async (name: string, status: StatusName, deadline: Deadline | undefined) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await api.createTask({
        kind: 'task',
        name,
        status: {
          name: status,
        },
        deadline,
      })
      fetchTasks()
      setModalState({ mode: 'closed' })
      console.log('Create task successful!')
    } catch (error) {
      console.error('Create task error:', error)
      setErrorMessage('Failed to create task')
    } finally {
      setIsLoading(false)
    }
  }

  const onUpdateTask = async (
    taskId: number,
    name: string,
    status: StatusName,
    deadline: Deadline | undefined,
  ) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      await api.updateTaskById(taskId, {
        kind: 'task',
        name,
        status: { name: status },
        deadline: deadline,
      })
      fetchTasks()
      setModalState({ mode: 'closed' })
      console.log('Update task successful!')
    } catch (error) {
      console.error('Update task error:', error)
      setErrorMessage('Failed to update task')
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteTask = async (taskId: number) => {
    try {
      await api.deleteTaskById(taskId)
      fetchTasks()
      console.log('Delete task successful!')
    } catch (error) {
      console.error('Delete task error:', error)
    }
  }

  const groupedTasks = useMemo(() => {
    return {
      todo: tasks.filter((task) => task.status.name === StatusName.todo),
      inProgress: tasks.filter((task) => task.status.name === StatusName.inProgress),
      done: tasks.filter((task) => task.status.name === StatusName.done),
      archive: tasks.filter((task) => task.status.name === StatusName.archive),
      pending: tasks.filter((task) => task.status.name === StatusName.pending),
    }
  }, [tasks])

  useEffect(() => {
    const loadTasks = async () => {
      await ensureCsrfToken()
      fetchTasks()
    }
    loadTasks()
  }, [fetchTasks])

  return {
    tasks,
    groupedTasks,
    modalState,
    isLoading,
    errorMessage,
    onCreateTask,
    onCreateClick,
    onEditClick,
    onUpdateTask,
    onCancelModal,
    onDeleteTask,
  }
}
