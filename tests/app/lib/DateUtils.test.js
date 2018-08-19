import * as DateUtils from '~/app/lib/DateUtils'

it('formats January short date correctly', () => {
  const date = new Date(2018, 0, 1)
  expect(DateUtils.getShortFormat(date)).toEqual("1/1")
})

it('formats April short date correctly', () => {
  const date = new Date(2018, 3, 2)
  expect(DateUtils.getShortFormat(date)).toEqual("4/2")
})

it('formats December short date correctly', () => {
  const date = new Date(2018, 11, 31)
  expect(DateUtils.getShortFormat(date)).toEqual("12/31")
})

it ('gets last Monday on a Sunday', () => {
  const date = new Date(2018, 3, 8)
  const expectedDate = new Date(2018, 3, 2)
  expect(DateUtils.getLastMonday(date)).toEqual(expectedDate)
})

it ('gets last Monday on a Monday', () => {
  const date = new Date(2018, 3, 2)
  expect(DateUtils.getLastMonday(date)).toEqual(date)
})
