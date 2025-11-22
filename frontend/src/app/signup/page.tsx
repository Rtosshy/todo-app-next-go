'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { postSignUpBody } from '@/gen/zod-schemas'
import LinkButton from '@/app/ui/link-button'
import PageName from '@/app/ui/page-name'
import InputForm from '@/app/ui/input-form'
import Button from '@/app/ui/button'
import { getTodoAPI } from '@/gen/api-client'
import { useRouter } from 'next/navigation'

const signUpFormSchema = postSignUpBody.shape.user
  .pick({
    email: true,
    password: true,
  })
  .extend({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
  })

type SignUpFormData = z.infer<typeof signUpFormSchema>

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const email = watch('email')
  const password = watch('password')

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const api = getTodoAPI()
      await api.postSignUp({
        kind: 'user',
        user: {
          kind: 'user',
          email: data.email,
          password: data.password,
        },
      })
      router.push('/todos')
      console.log('Sign up successful!')
    } catch (error) {
      console.error('Sign up error:', error)
      setErrorMessage('Failed to sign up')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PageName pageName="Sign up"></PageName>
      <LinkButton href="/login" label="Go to Login"></LinkButton>
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
        <Button name="Sign up" onClick={handleSubmit(onSubmit)} loading={isLoading}></Button>
      </form>
      {errorMessage && <div className="text-red-700 p-3 rounded mt-4 mb-4">{errorMessage}</div>}
    </div>
  )
}
