import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { postLoginBody } from '@/gen/zod-schemas'
import { getTodoAPI } from '@/gen/api-client'
import { useRouter } from 'next/navigation'

const authFormSchema = postLoginBody.shape.user
  .pick({
    email: true,
    password: true,
  })
  .extend({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
  })

type AuthFormData = z.infer<typeof authFormSchema>

export function useAuth(type: 'login' | 'signup') {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const email = watch('email')
  const password = watch('password')

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const api = getTodoAPI()

      if (type === 'login') {
        await api.postLogin({
          kind: 'user',
          user: {
            kind: 'user',
            email: data.email,
            password: data.password,
          },
        })
        console.log('Login successful!')
      } else {
        await api.postSignUp({
          kind: 'user',
          user: {
            kind: 'user',
            email: data.email,
            password: data.password,
          },
        })
        console.log('Sign up successful!')
      }

      router.push('/todos')
    } catch (error) {
      console.error(`${type === 'login' ? 'Login' : 'Sign up'} error:`, error)
      setErrorMessage(`Failed to ${type === 'login' ? 'login' : 'sign up'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email,
    password,
    errors,
    setValue,
    handleSubmit,
    isLoading,
    errorMessage,
    onSubmit,
  }
}
