'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PageHeader from '@/app/ui/page-header'
import InputForm from '@/app/ui/input-form'
import Button from '@/app/ui/button'
import { useAuth } from './hooks/useAuth'
import AuthTabs from './components/AuthTabs'

function AuthContent() {
  const searchParams = useSearchParams()
  const tab = (searchParams.get('tab') || 'login') as 'login' | 'signup'

  const { email, password, errors, setValue, handleSubmit, isLoading, errorMessage, onSubmit } =
    useAuth(tab)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Tabs only */}
      <PageHeader rightContent={<AuthTabs activeTab={tab} />} />

      {/* Form Container - Vertically and Horizontally Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-gray-900 p-8 rounded-lg">
            {/* Form Title */}
            <h2 className="text-3xl font-bold mb-6 text-white text-center">
              {tab === 'login' ? 'Login' : 'Sign up'}
            </h2>

            {/* Login Form */}
            {tab === 'login' && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <InputForm
                    value={email}
                    onChange={(value: string) =>
                      setValue('email', value, { shouldValidate: false })
                    }
                    placeholder="email"
                  ></InputForm>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <InputForm
                    value={password}
                    onChange={(value: string) =>
                      setValue('password', value, { shouldValidate: false })
                    }
                    placeholder="password"
                  ></InputForm>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Button
                    name="Login"
                    onClick={handleSubmit(onSubmit)}
                    loading={isLoading}
                  ></Button>
                </div>
              </form>
            )}

            {/* Signup Form */}
            {tab === 'signup' && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <InputForm
                    value={email}
                    onChange={(value: string) =>
                      setValue('email', value, { shouldValidate: false })
                    }
                    placeholder="email"
                  ></InputForm>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <InputForm
                    value={password}
                    onChange={(value: string) =>
                      setValue('password', value, { shouldValidate: false })
                    }
                    placeholder="password"
                  ></InputForm>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <Button
                    name="Sign up"
                    onClick={handleSubmit(onSubmit)}
                    loading={isLoading}
                  ></Button>
                </div>
              </form>
            )}

            {errorMessage && (
              <div className="text-red-700 p-3 rounded mt-4 mb-4">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Auth() {
  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}
    >
      <AuthContent />
    </Suspense>
  )
}
