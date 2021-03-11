import React from 'react'
import AppContainer from './app/navigations/navStack'
import { UserProvider } from './app/contexts/UserContext'

export default function App() {
  return (
    <UserProvider>
      <AppContainer />
    </UserProvider>
  )
}
