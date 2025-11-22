import { Task } from '@/gen/api-client'
import TaskCard from '@/app/ui/task-card'

interface TasksViewProps {
  tasks: Task[]
  onDelete: (taskId: number) => void
  onEdit: (task: Task) => void
}

export default function TasksView({ tasks, onDelete, onEdit }: TasksViewProps) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}
