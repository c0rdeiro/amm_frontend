import dateFormat from 'dateformat'

type formatDateOptions = {
  hideYear?: boolean
  hideHours?: boolean
}

export default function formatDateTime(
  date: Date,
  options?: formatDateOptions
): string {
  const { hideYear = true, hideHours = true } = options || {}

  return dateFormat(
    date,
    `mmm d${!hideYear ? ', yyyy ' : ''}${!hideHours ? ', hTT' : ''}`
  )
}