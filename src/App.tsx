import React from 'react'
import { GlobalStyle } from './styles/GlobalStyle'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppRouter } from './routes'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App 