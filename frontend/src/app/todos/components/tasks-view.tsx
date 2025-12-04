import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core'
import { useState } from 'react'
import { Task, StatusName } from '@/gen/api-client'
import StatusColumn from './status-column'
import TaskCard from './task-card'

interface TasksViewProps {
  groupedTasks: {
    todo: Task[]
    inProgress: Task[]
    done: Task[]
    archive: Task[]
    pending: Task[]
  }
  onDelete: (taskId: number) => void
  onEdit: (task: Task) => void
  onUpdateStatus: (taskId: number, newStatus: StatusName) => void
}

export default function TasksView({ groupedTasks, onDelete, onEdit, onUpdateStatus }: TasksViewProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = findTaskById(active.id as number)
    setActiveTask(task)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const taskId = active.id as number
      const newStatus = over.id as StatusName

      onUpdateStatus(taskId, newStatus)
    }

    setActiveTask(null)
  }

  const findTaskById = (id: number): Task | null => {
    const allTasks = [
      ...groupedTasks.pending,
      ...groupedTasks.todo,
      ...groupedTasks.inProgress,
      ...groupedTasks.done,
      ...groupedTasks.archive,
    ]
    return allTasks.find((task) => task.id === id) || null
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto mt-6 pb-4 custom-scrollbar">
        <StatusColumn
          id={StatusName.pending}
          title="Pending"
          tasks={groupedTasks.pending}
          onDelete={onDelete}
          onEdit={onEdit}
          headerColor="bg-purple-700"
          cardColor="bg-purple-800/40"
        />
        <StatusColumn
          id={StatusName.todo}
          title="To Do"
          tasks={groupedTasks.todo}
          onDelete={onDelete}
          onEdit={onEdit}
          headerColor="bg-slate-700"
          cardColor="bg-slate-800/50"
        />
        <StatusColumn
          id={StatusName.inProgress}
          title="In Progress"
          tasks={groupedTasks.inProgress}
          onDelete={onDelete}
          onEdit={onEdit}
          headerColor="bg-blue-700"
          cardColor="bg-blue-800/40"
        />
        <StatusColumn
          id={StatusName.done}
          title="Done"
          tasks={groupedTasks.done}
          onDelete={onDelete}
          onEdit={onEdit}
          headerColor="bg-green-700"
          cardColor="bg-green-800/40"
        />
        <StatusColumn
          id={StatusName.archive}
          title="Archive"
          tasks={groupedTasks.archive}
          onDelete={onDelete}
          onEdit={onEdit}
          headerColor="bg-amber-800"
          cardColor="bg-amber-900/50"
        />
      </div>
      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} onDelete={() => {}} onEdit={() => {}} cardColor="bg-gray-800" />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
