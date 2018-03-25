/**
 * Takes in an in-progress or completed monetary input, and returns the number of cents associated
 * with the input.
 */
export default function(moneyInput: string): number {
  if (moneyInput.length == 0) {
    return 0
  }
  if (!moneyInput.includes(".")) {
    return parseInt(moneyInput) * 100
  } else {
    if (moneyInput === ".") return 0
    const dotStrippedMoneyInput = moneyInput.replace(".", "")
    const inputLength = moneyInput.length
    const dotIndex = moneyInput.indexOf(".")
    if (dotIndex == inputLength - 1) { // No cents inputted but dot was added
      return parseInt(dotStrippedMoneyInput) * 100
    } else if (dotIndex == inputLength - 2) { // One cent digit
      return parseInt(dotStrippedMoneyInput) * 10
    } else if (dotIndex == inputLength - 3) { // Two cent digits
      return parseInt(dotStrippedMoneyInput)
    } else { // >2 cent digits
      return parseInt(moneyInput.slice(0, dotIndex + 3).replace(".", ""))
    }
  }
}
