'use client'

type ButtonProps = {
  name: string
  onClick: () => void
  loading: boolean
}

export default function Button({ name, onClick, loading }: ButtonProps) {
  return (
    <button
      type="button"
      className="font-bold rounded bg-gray-200 px-4 py-2 mt-4 mb-4 text-gray-800 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Processing...' : name}
    </button>
  )
}
