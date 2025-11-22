'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { postLoginBody } from '@/gen/zod-schemas'
import PageName from '@/app/ui/page-name'
import LinkButton from '@/app/ui/link-button'
import InputForm from '@/app/ui/input-form'
import Button from '@/app/ui/button'
import { getTodoAPI } from '@/gen/api-client'
import { useRouter } from 'next/navigation'

const loginFormSchema = postLoginBody.shape.user
  .pick({
    email: true,
    password: true,
  })
  .extend({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
  })

type LoginFormData = z.infer<typeof loginFormSchema>

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const email = watch('email')
  const password = watch('password')

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const api = getTodoAPI()
      await api.postLogin({
        kind: 'user',
        user: {
          kind: 'user',
          email: data.email,
          password: data.password,
        },
      })
      router.push('/todos')
      console.log('Login successful!')
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('Failed to login')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <PageName pageName="Login"></PageName>
      <LinkButton href="/signup" label="Go to Sign Up"></LinkButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputForm
            value={email}
            onChange={(value: string) => setValue('email', value, { shouldValidate: false })}
            placeholder="email"
          ></InputForm>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <InputForm
            value={password}
            onChange={(value: string) => setValue('password', value, { shouldValidate: false })}
            placeholder="password"
          ></InputForm>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <Button name="Login" onClick={handleSubmit(onSubmit)} loading={isLoading}></Button>
      </form>
      {errorMessage && <div className="text-red-700 p-3 rounded mt-4 mb-4">{errorMessage}</div>}
    </div>
  )
}
