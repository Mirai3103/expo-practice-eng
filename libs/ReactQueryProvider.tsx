import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'

onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    console.log('state',state);
    setOnline(!!state.isConnected)
  })
  return eventSubscription.remove
})
const queryClient = new QueryClient()

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}