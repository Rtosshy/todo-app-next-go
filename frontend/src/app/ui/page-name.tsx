'use client'

type PageNameProps = {
  pageName: string
}

export default function PageName({ pageName }: PageNameProps) {
  return <div className="mb-8 text-4xl font-bold">{pageName}</div>
}
