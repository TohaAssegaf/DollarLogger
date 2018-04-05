/**
 * Returns the cent-formatted string associated with the input.
 */
export function formatMoneyCents(totalCents: number): string {
  const dollars: string = Math.floor(totalCents / 100).toString()
  const fractionalCents: number = totalCents % 100
  let formattedFractionalCents: string = fractionalCents.toString()
  if (fractionalCents < 10) {
    formattedFractionalCents = "0" + formattedFractionalCents
  }
  return dollars + "." + formattedFractionalCents
}

/**
 * Takes in a partial or complete money input and returns the appropriate text field value.
 */
export function formatAmbiguousMoneyInput(ambiguousMoney: string) {
  ambiguousMoney = ambiguousMoney.replace(/[^0-9.]/, '')
  if (!ambiguousMoney.includes(".")) {
    return ambiguousMoney
  } else {
    const dotSeparatedSections = ambiguousMoney.split(".")
    const strippedAmbiguousMoney = dotSeparatedSections.slice(0, 2).join(".")
    return strippedAmbiguousMoney.slice(0, strippedAmbiguousMoney.indexOf(".") + 3)
  }
}