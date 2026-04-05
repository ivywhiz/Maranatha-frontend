// lib/hooks/use-donations.ts

import { useMutation } from '@tanstack/react-query'
import { createDonationIntent } from '../../lib/api'
import type { CreateIntentRequest } from '../../types/api'

export function useCreateDonationIntent() {
  return useMutation({
    mutationFn: (data: CreateIntentRequest) => createDonationIntent(data),
  })
}
