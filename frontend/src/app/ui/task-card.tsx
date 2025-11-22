import { Task } from '@/gen/api-client'
import Button from '@/app/ui/button'

interface TaskCardProps {
  task: Task
  onDelete: (taskId: number) => void
  onEdit: (task: Task) => void
}

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  return (
    <div className="border p-4 rounded mb-2">
      <h3 className="text-lg font-bold">{task.name}</h3>
      <p className="text-sm text-gray-100">Status: {task.status.name}</p>
      <div className="flex gap-2 mt-2">
        <Button name="Edit" onClick={() => onEdit(task)} loading={false} />
        <Button name="Delete" onClick={() => onDelete(task.id)} loading={false} />
      </div>
    </div>
  )
}
