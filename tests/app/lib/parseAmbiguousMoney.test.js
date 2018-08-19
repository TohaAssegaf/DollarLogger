import parseAmbiguousMoney from '~/app/lib/parseAmbiguousMoney'

it('parses no decimal input correctly', () => {
  const input = "123"
  expect(parseAmbiguousMoney(input)).toEqual(12300)
});

it('parses decimal point input correctly', () => {
  const input = "123."
  expect(parseAmbiguousMoney(input)).toEqual(12300)
});

it('parses first decimal place input correctly', () => {
  const input = "123.1"
  expect(parseAmbiguousMoney(input)).toEqual(12310)
});

it('parses first decimal place input correctly with 0', () => {
  const input = "123.0"
  expect(parseAmbiguousMoney(input)).toEqual(12300)
});

it('parses full decimal input correctly', () => {
  const input = "123.45"
  expect(parseAmbiguousMoney(input)).toEqual(12345)
});

it('parses too many decimal places input correctly', () => {
  const input = "123.456"
  expect(parseAmbiguousMoney(input)).toEqual(12345)
});

it('parses <1 input correctly', () => {
  const input = "0.35"
  expect(parseAmbiguousMoney(input)).toEqual(35)
});

it('parses <.1 input', () => {
  const input = "0.05"
  expect(parseAmbiguousMoney(input)).toEqual(5)
});

it('parses 0 input', () => {
  const input = "0"
  expect(parseAmbiguousMoney(input)).toEqual(0)
});

it('parses . input', () => {
  const input = "."
  expect(parseAmbiguousMoney(input)).toEqual(0)
});

it('parses multiple . input', () => {
  const input = "100.25."
  expect(parseAmbiguousMoney(input)).toEqual(10025)
});
