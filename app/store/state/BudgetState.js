export default class BudgetState {
  total: number
  
  constructor(total) {
    this.total = total
  }

  getTotal() {
    return this.total
  }
}
