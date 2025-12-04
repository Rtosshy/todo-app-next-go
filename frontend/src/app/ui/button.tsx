'use client'

type ButtonProps = {
  name: string
  onClick: () => void
  loading: boolean
  bgColor?: string
  hoverColor?: string
}

export default function Button({ name, onClick, loading, bgColor, hoverColor }: ButtonProps) {
  const defaultBg = bgColor || 'bg-gray-700'
  const defaultHover = hoverColor || 'hover:bg-gray-600'

  return (
    <button
      type="button"
      className={`font-bold rounded ${defaultBg} px-4 py-2 mt-4 mb-4 text-gray-100 ${defaultHover} shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Processing...' : name}
    </button>
  )
}
