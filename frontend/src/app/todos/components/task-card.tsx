import { Task } from '@/gen/api-client'
import Button from '@/app/ui/button'

interface TaskCardProps {
  task: Task
  onDelete: (taskId: number) => void
  onEdit: (task: Task) => void
  cardColor: string
}

export default function TaskCard({ task, onDelete, onEdit, cardColor }: TaskCardProps) {
  return (
    <div className={`p-4 rounded mb-2 ${cardColor}`}>
      <h3 className="text-xl font-bold break-words">{task.name}</h3>
      {task.deadline && <p className="text-base font-bold text-gray-300 mt-2">Deadline: {task.deadline}</p>}
      <div className="flex gap-2 mt-3">
        <Button name="Edit" onClick={() => onEdit(task)} loading={false} />
        <Button name="Delete" onClick={() => onDelete(task.id)} loading={false} />
      </div>
    </div>
  )
}
