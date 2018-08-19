import { formatMoney, formatMoneyCents, formatAmbiguousMoneyInput } from '~/app/lib/MoneyFormatter'

it('formats full money correctly', () => {
  const totalCents = 10000
  expect(formatMoney(totalCents)).toEqual("$100.00")
});

it('formats negative full money correctly', () => {
  const totalCents = -10000
  expect(formatMoney(totalCents)).toEqual("-$100.00")
});

it('formats correctly with 0 fractional cents', () => {
  const totalCents = 10000
  expect(formatMoneyCents(totalCents)).toEqual("100.00")
});

it('formats correctly with <10 fractional cents', () => {
  const totalCents = 10004
  expect(formatMoneyCents(totalCents)).toEqual("100.04")
});

it('formats correctly with 10 fractional cents', () => {
  const totalCents = 10010
  expect(formatMoneyCents(totalCents)).toEqual("100.10")
});

it('formats correctly with >10 fractional cents', () => {
  const totalCents = 10099
  expect(formatMoneyCents(totalCents)).toEqual("100.99")
});

it('formats correctly with 0 total cents', () => {
  const totalCents = 0
  expect(formatMoneyCents(totalCents)).toEqual("0.00")
});

it('formats correctly with <100 total cents', () => {
  const totalCents = 99
  expect(formatMoneyCents(totalCents)).toEqual("0.99")
});

it('formats ambiguous input correctly with no decimal', () => {
  const totalCents = "99"
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual("99")
});

it('formats ambiguous input correctly with decimal at end', () => {
  const totalCents = "99."
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual("99.")
});

it('formats ambiguous input correctly with empty string', () => {
  const totalCents = ""
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual("")
});

it('formats ambiguous input correctly with only decimal', () => {
  const totalCents = "."
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual(".")
});

it('formats ambiguous input correctly with one decinal place', () => {
  const totalCents = ".1"
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual(".1")
});

it('formats ambiguous input correctly with dollar and one decinal place', () => {
  const totalCents = "1.1"
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual("1.1")
});

it('formats ambiguous input correctly with dollar and two decinal place', () => {
  const totalCents = "1.12"
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual("1.12")
});

it('formats ambiguous input correctly with too many decimal places', () => {
  const totalCents = "1.123"
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual("1.12")
});

it('formats ambiguous input correctly with too many decimal points', () => {
  const totalCents = "1.12."
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual("1.12")
});

it('formats ambiguous input correctly with too many decimal points', () => {
  const totalCents = "1.1234.123"
  expect(formatAmbiguousMoneyInput(totalCents)).toEqual("1.12")
});
