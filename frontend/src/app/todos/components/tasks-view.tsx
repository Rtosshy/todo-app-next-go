import { Task } from '@/gen/api-client'
import StatusColumn from './status-column'

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
}

export default function TasksView({ groupedTasks, onDelete, onEdit }: TasksViewProps) {
  return (
    <div className="flex gap-4 overflow-x-auto mt-6 pb-4 custom-scrollbar">
      <StatusColumn
        title="Pending"
        tasks={groupedTasks.pending}
        onDelete={onDelete}
        onEdit={onEdit}
        headerColor="bg-purple-700"
        cardColor="bg-purple-800/40"
      />
      <StatusColumn
        title="To Do"
        tasks={groupedTasks.todo}
        onDelete={onDelete}
        onEdit={onEdit}
        headerColor="bg-slate-700"
        cardColor="bg-slate-800/50"
      />
      <StatusColumn
        title="In Progress"
        tasks={groupedTasks.inProgress}
        onDelete={onDelete}
        onEdit={onEdit}
        headerColor="bg-blue-700"
        cardColor="bg-blue-800/40"
      />
      <StatusColumn
        title="Done"
        tasks={groupedTasks.done}
        onDelete={onDelete}
        onEdit={onEdit}
        headerColor="bg-green-700"
        cardColor="bg-green-800/40"
      />
      <StatusColumn
        title="Archive"
        tasks={groupedTasks.archive}
        onDelete={onDelete}
        onEdit={onEdit}
        headerColor="bg-amber-800"
        cardColor="bg-amber-900/50"
      />
    </div>
  )
}
