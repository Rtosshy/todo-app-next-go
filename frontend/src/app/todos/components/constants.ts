import { StatusName } from '@/gen/api-client'

export const statusOptions = [
  { value: StatusName.todo, label: 'To Do' },
  { value: StatusName.inProgress, label: 'In Progress' },
  { value: StatusName.done, label: 'Done' },
  { value: StatusName.archive, label: 'Archive' },
  { value: StatusName.pending, label: 'Pending' },
]
