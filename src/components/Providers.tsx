'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import {FC, ReactNode } from "react"

interface ProvidersProps {
    children: ReactNode
}
const queryClient = new QueryClient()
const Providers: FC<ProvidersProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
