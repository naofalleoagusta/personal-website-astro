const formatDate = (date: string, withoutHour?: boolean) => {
  const newDate = new Date(date)

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  }

  if (!withoutHour) {
    formatOptions.hour = "numeric"
    formatOptions.minute = "numeric"
    formatOptions.hour12 = true
  }

  return newDate.toLocaleString("en-US", formatOptions).replace(",", "")
}

export default formatDate
