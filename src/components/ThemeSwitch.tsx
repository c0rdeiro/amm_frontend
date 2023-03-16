import { ThemeContext } from '@/providers/ThemeProvider'
import clsx from 'clsx'
import { useContext, useEffect, useState } from 'react'
import { HiMoon, HiOutlineMoon, HiOutlineSun, HiSun } from 'react-icons/hi2'

const ThemeSwitch = () => {
  const { isDarkTheme, toggleDarkTheme } = useContext(ThemeContext)

  return (
    <>
      <button
        onClick={toggleDarkTheme}
        className={clsx(
          'rounded-lg border border-primary p-2 dark:border-white'
        )}
      >
        {isDarkTheme ? (
          <HiMoon color="white" size="1.5em" />
        ) : (
          <HiSun color="#2e979a" size="1.5em" />
        )}
      </button>
    </>
  )
}
export default ThemeSwitch
