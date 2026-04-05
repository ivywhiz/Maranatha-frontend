// lib/hooks/use-auth.ts
// Admin authentication hook.

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login, logout } from '../../lib/api'
import { tokenStore } from '../../lib/api/client'
import type { LoginRequest, AdminPublic } from '../../types/api'

// Simple in-memory admin state — not persisted (by design)
let adminState: AdminPublic | null = null

export function useAuth() {
  const [admin, setAdmin] = useState<AdminPublic | null>(adminState)
  const [isLoggedIn, setIsLoggedIn] = useState(!!tokenStore.get())

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (res) => {
      adminState = res.admin
      setAdmin(res.admin)
      setIsLoggedIn(true)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      adminState = null
      setAdmin(null)
      setIsLoggedIn(false)
    },
  })

  return {
    admin,
    isLoggedIn,
    login: loginMutation,
    logout: logoutMutation,
  }
}
