import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { HiMoon, HiOutlineMoon, HiOutlineSun, HiSun } from 'react-icons/hi2'

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<string>('dark')
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)

    localStorage.setItem('theme', theme)
  }, [theme, colorTheme])

  const switchTheme = () =>
    colorTheme === 'dark' ? setTheme('dark') : setTheme('light')

  return (
    <>
      <button
        onClick={switchTheme}
        className={clsx(
          {
            'border-white': colorTheme === 'light',
            'border-primary': colorTheme === 'dark',
          },
          'rounded-lg border  p-2'
        )}
      >
        {colorTheme === 'dark' ? (
          <HiSun color="#2e979a" size="1.5em" />
        ) : (
          <HiMoon color="white" size="1.5em" />
        )}
      </button>
    </>
  )
}
export default ThemeSwitch
