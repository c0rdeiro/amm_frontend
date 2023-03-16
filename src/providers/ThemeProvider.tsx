import { createContext, useState } from 'react'

const ThemeContext = createContext<{
  isDarkTheme: boolean
  toggleDarkTheme: () => void
}>({ isDarkTheme: true, toggleDarkTheme: () => {} }) // eslint-disable-line @typescript-eslint/no-empty-function

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setisDarkTheme] = useState(true)

  if (typeof window === 'object') {
    const root = window.document.documentElement
    root.classList.add(!isDarkTheme ? 'light' : 'dark')
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')
  }
  const toggleDarkTheme = () => {
    setisDarkTheme(!isDarkTheme)
    const root = window.document.documentElement
    root.classList.remove(!isDarkTheme ? 'light' : 'dark')
    root.classList.add(isDarkTheme ? 'light' : 'dark')

    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export { ThemeProvider, ThemeContext }
