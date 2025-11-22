import Link from 'next/link'

type LinkButtonProps = {
  href: string
  label: string
}

export default function LinkButton({ href, label }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="font-bold rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
    >
      {label}
    </Link>
  )
}
