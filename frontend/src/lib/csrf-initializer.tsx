'use client'

import { useEffect } from 'react'
import { ensureCsrfToken } from '@/lib/csrf-store'

export function CsrfInitializer() {
  useEffect(() => {
    ensureCsrfToken()
  }, [])

  return null
}
