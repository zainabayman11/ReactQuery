import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Todo from './ToDo/Todo'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // for refetching data when the window is focused , Contraception on the server
      refetchOnWindowFocus: false,
    },
  },
})

function App() {


  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Todo /> 
      </QueryClientProvider>
    </>
  )
}

export default App
