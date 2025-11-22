'use client'

type InputFormProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export default function InputForm({ value, onChange, placeholder }: InputFormProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="mt-4 mr-4 px-4 py-2 border border-gray-300 rounded-md bg-white w-85 text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
