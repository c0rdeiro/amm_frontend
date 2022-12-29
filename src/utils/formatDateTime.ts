import dateFormat from 'dateformat'

type formatDateOptions = {
  hideYear?: boolean
  hideHours?: boolean
  hideMinutes?: boolean
}

export default function formatDateTime(
  date: Date,
  options?: formatDateOptions
): string {
  const {
    hideYear = true,
    hideHours = true,
    hideMinutes = true,
  } = options || {}

  return dateFormat(
    date,
    `mmm d${!hideYear ? ', yyyy ' : ''}${
      !hideHours ? (hideMinutes ? ', hTT' : ', h:MMTT') : ''
    }`
  )
}
