// lib/hooks/use-contact.ts

import { useMutation } from '@tanstack/react-query'
import { submitContactForm } from '../../lib/api'
import type { ContactRequest } from '../../types/api'

export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactRequest) => submitContactForm(data),
  })
}
