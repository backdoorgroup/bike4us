export const truncateFloat = (value: number, digits: number = 1) => parseFloat(value.toFixed(digits))

export const totalize = (numbers: number[]) => {
  let total = 0

  numbers.forEach((number) => {
    total += number
  })

  return total
}
