import { getTodoAPI } from '@/gen/api-client'

let csrfToken: string | null = null
let csrfPromise: Promise<string> | null = null

export const ensureCsrfToken = async (): Promise<string> => {
  if (csrfToken) {
    return csrfToken
  }

  if (!csrfPromise) {
    const api = getTodoAPI()
    csrfPromise = api.getCsrfToken().then((response) => {
      const token = response.data
      setCsrfToken(token)
      return token
    })
  }
  return csrfPromise
}

export const setCsrfToken = (token: string) => {
  csrfToken = token
}

export const getCsrfToken = () => {
  return csrfToken
}

export const hasCsrfToken = () => {
  return !!csrfToken
}

export const clearCsrfToken = () => {
  csrfToken = null
}
