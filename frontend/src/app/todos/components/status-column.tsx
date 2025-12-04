import { useDroppable } from '@dnd-kit/core'
import { Task, StatusName } from '@/gen/api-client'
import TaskCard from './task-card'

interface StatusColumnProps {
  id: StatusName
  title: string
  tasks: Task[]
  onDelete: (taskId: number) => void
  onEdit: (task: Task) => void
  headerColor: string
  cardColor: string
}

export default function StatusColumn({ id, title, tasks, onDelete, onEdit, headerColor, cardColor }: StatusColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="flex-1 min-w-[300px]">
      <h2 className={`text-xl font-bold mb-4 px-4 py-2 ${headerColor} rounded`}>{title}</h2>
      <div className="space-y-2 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} cardColor={cardColor} />
        ))}
      </div>
    </div>
  )
}
