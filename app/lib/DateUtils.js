export function getShortFormat(date: Date): string {
  return (date.getMonth() + 1) + "/" + date.getDate()
}

const ONE_DAY = 86400000

export function getLastMonday(date: Date): Date {
  let resultDate = date
  // While resultDate is not Monday, keep subtracting one day.
  while (resultDate.getDay() != 1) {
    resultDate = new Date(resultDate - ONE_DAY)
  }
  return stripTime(resultDate)
}

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
