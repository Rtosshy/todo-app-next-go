import { ReactNode } from 'react'

type PageHeaderProps = {
  title?: string
  rightContent?: ReactNode
}

export default function PageHeader({ title, rightContent }: PageHeaderProps) {
  return (
    <div className={`flex items-center mb-6 px-4 ${title ? 'justify-between' : 'justify-end'}`}>
      {title && <h1 className="text-2xl font-bold leading-none">{title}</h1>}
      {rightContent && <div>{rightContent}</div>}
    </div>
  )
}
