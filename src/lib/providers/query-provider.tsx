'use client'
// lib/providers/query-provider.tsx
// Wrap the app with TanStack Query provider.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a stable QueryClient per component instance (required by TanStack)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 60 seconds — avoids redundant refetches
            staleTime: 60 * 1000,
            // Keep unused data in cache for 5 minutes
            gcTime: 5 * 60 * 1000,
            // Retry failed requests once before showing error
            retry: 1,
            // Do not refetch when window regains focus (reduces noise)
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only shown in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      )}
    </QueryClientProvider>
  )
}
