import * as BudgetModel from '~/app/store/models/budget'

describe('BudgetModel', () => {
  it('should return null if nothing is in storage', () => {
    BudgetModel.getTotal().then(total => expect(total).toEqual(null))
  })

  it('should successfully set budget total', () => {
    const expectedTotal = 10000
    BudgetModel.setTotal(expectedTotal).then(
      () => BudgetModel.getTotal().then(total => expect(total).toEqual(expectedTotal)))

  })
})
