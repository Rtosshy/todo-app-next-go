'use client'

type InputFormProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
}

export default function InputForm({ value, onChange, placeholder, type = 'text' }: InputFormProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="mt-4 px-4 py-2 border border-gray-300 rounded-md bg-white w-full text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
