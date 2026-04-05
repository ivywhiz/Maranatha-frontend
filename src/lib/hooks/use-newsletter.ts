// lib/hooks/use-newsletter.ts

import { useMutation } from '@tanstack/react-query'
import { subscribe, unsubscribe } from '../../lib/api'
import type { SubscribeRequest } from '../../types/api'

export function useSubscribe() {
  return useMutation({
    mutationFn: (data: SubscribeRequest) => subscribe(data),
  })
}

export function useUnsubscribe() {
  return useMutation({
    mutationFn: (email: string) => unsubscribe(email),
  })
}
