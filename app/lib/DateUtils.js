export function getShortFormat(date: Date): string {
  return (date.getMonth() + 1) + "/" + date.getDate()
}

export function getLastMonday(date: Date): Date {
  const daysSinceMonday = (date.getDay() + 6) % 7
  const lastMonday = new Date()
  lastMonday.setDate(date.getDate() - daysSinceMonday)
  return stripTime(lastMonday)
}

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
