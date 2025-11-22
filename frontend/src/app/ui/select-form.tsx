'use client'

type SelectOption = {
  value: string
  label: string
}

type SelectFormProps = {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
}

export default function SelectForm({ value, onChange, options, placeholder }: SelectFormProps) {
  return (
    <select
      className="mt-4 px-4 py-2 border border-gray-300 rounded-md bg-white w-85 text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
