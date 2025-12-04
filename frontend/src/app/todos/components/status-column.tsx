import { Task } from '@/gen/api-client'
import TaskCard from './task-card'

interface StatusColumnProps {
  title: string
  tasks: Task[]
  onDelete: (taskId: number) => void
  onEdit: (task: Task) => void
  headerColor: string
  cardColor: string
}

export default function StatusColumn({ title, tasks, onDelete, onEdit, headerColor, cardColor }: StatusColumnProps) {
  return (
    <div className="flex-1 min-w-[300px]">
      <h2 className={`text-xl font-bold mb-4 px-4 py-2 ${headerColor} rounded`}>{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} cardColor={cardColor} />
        ))}
      </div>
    </div>
  )
}
