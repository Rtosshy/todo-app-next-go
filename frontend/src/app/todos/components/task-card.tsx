import { useDraggable } from '@dnd-kit/core'
import { Task, StatusName } from '@/gen/api-client'
import Button from '@/app/ui/button'

interface TaskCardProps {
  task: Task
  onDelete: (taskId: number) => void
  onEdit: (task: Task) => void
  cardColor: string
}

const buttonColors: Record<StatusName, { bg: string; hover: string }> = {
  [StatusName.todo]: { bg: 'bg-slate-700', hover: 'hover:bg-slate-600' },
  [StatusName.inProgress]: { bg: 'bg-blue-800', hover: 'hover:bg-blue-700' },
  [StatusName.done]: { bg: 'bg-green-800', hover: 'hover:bg-green-700' },
  [StatusName.pending]: { bg: 'bg-purple-800', hover: 'hover:bg-purple-700' },
  [StatusName.archive]: { bg: 'bg-amber-900', hover: 'hover:bg-amber-800' },
}

export default function TaskCard({ task, onDelete, onEdit, cardColor }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })

  const colors = buttonColors[task.status.name] || { bg: 'bg-gray-700', hover: 'hover:bg-gray-600' }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0 : 1,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`p-4 rounded mb-2 ${cardColor} cursor-grab active:cursor-grabbing`}>
      <h3 className="text-xl font-bold break-words">{task.name}</h3>
      {task.deadline && <p className="text-base font-bold text-gray-300 mt-2">Deadline: {task.deadline}</p>}
      <div className="flex gap-2 mt-3">
        <Button name="Edit" onClick={() => onEdit(task)} loading={false} bgColor={colors.bg} hoverColor={colors.hover} />
        <Button
          name="Delete"
          onClick={() => onDelete(task.id)}
          loading={false}
          bgColor={colors.bg}
          hoverColor={colors.hover}
        />
      </div>
    </div>
  )
}
