import React, { createContext, useContext, useState, useCallback } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { lightTheme, darkTheme } from '../styles/theme'

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev)
  }, [])

  const theme = isDark ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        <ConfigProvider
          theme={{
            algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            token: {
              colorPrimary: theme.colors.primary,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 