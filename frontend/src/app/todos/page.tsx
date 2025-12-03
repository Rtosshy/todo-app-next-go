'use client'

import { useState, useMemo } from 'react'
import PageName from '@/app/ui/page-name'
import Button from '@/app/ui/button'
import { useRouter } from 'next/navigation'
import { getTodoAPI } from '@/gen/api-client'
import TasksView from './components/tasks-view'
import TaskModal from './components/task-modal'
import { useTodos } from './hooks/useTodos'

export default function Todos() {
  const api = useMemo(() => getTodoAPI(), [])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    tasks,
    modalState,
    isLoading: isTaskLoading,
    errorMessage,
    onCreateTask,
    onCreateClick,
    onEditClick,
    onUpdateTask,
    onCancelModal,
    onDeleteTask,
  } = useTodos()

  const onLogout = async () => {
    setIsLoading(true)
    try {
      await api.postLogout()
      router.push('/auth')
      console.log('Logout successful!')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PageName pageName="Todos"></PageName>
      <div className="flex gap-2">
        <Button name="Create" onClick={onCreateClick} loading={false}></Button>
        <Button name="Logout" onClick={onLogout} loading={isLoading}></Button>
      </div>
      {errorMessage && <div className="text-red-700 p-3 rounded mt-4 mb-4">{errorMessage}</div>}
      <TasksView tasks={tasks} onDelete={onDeleteTask} onEdit={onEditClick} />
      {modalState.mode === 'edit' && (
        <TaskModal
          mode="edit"
          task={modalState.task}
          onSave={onUpdateTask}
          onCancel={onCancelModal}
          isLoading={isTaskLoading}
        />
      )}
      {modalState.mode === 'create' && (
        <TaskModal mode="create" onSave={onCreateTask} onCancel={onCancelModal} isLoading={isTaskLoading} />
      )}
    </div>
  )
}
