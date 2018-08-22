import actions from '~/app/actions'
import UpdatePaymentForm from '~/app/components/payment/UpdatePaymentForm'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as PaymentModel from '~/app/store/models/payment'
import enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MockDate from 'mockdate'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'

enzyme.configure({ adapter: new Adapter() })
const navigation = { goBack: jest.fn() }
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let mockPayments = []
jest.mock('../../../../app/store/models/payment', () => {
  return {
    updatePayment: jest.fn((item, payment) => {
      return new Promise((resolve, reject) => {
        mockPayments = mockPayments.map(
          mockPayment => mockPayment.id === payment.id ? payment : mockPayment)
        resolve(mockPayments)
      })
    })
  }
})

it('renders correctly', () => {
  const payment = new PaymentBuilder()
    .setId(1)
    .setTotal(1000)
    .setName("Test payment")
    .setDate(new Date(2018, 4, 3))
    .build()
  const store = mockStore({ payment: { payments: [payment] } })
  const rendered = renderer.create(<UpdatePaymentForm
    payment={payment}
    store={store}
    navigation={navigation}
  />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('dispatches update payment action and navigates back', () => {
  const payment = new PaymentBuilder()
    .setId(1)
    .setTotal(1000)
    .setName("Test payment")
    .setDate(new Date(2018, 4, 2))
    .setSplitCount(4)
    .build()
  const newTotal = 20000
  const newName = "New name"
  const newDate = new Date(2018, 4, 3)
  const newSplitCount = 1
  const updatedPayment = new PaymentBuilder()
    .setId(1)
    .setTotal(newTotal)
    .setName(newName)
    .setDate(newDate)
    .setSplitCount(newSplitCount)
    .build()
  const store = mockStore({ payment: { payments: [payment] } })
  const wrapper = shallow(
    <UpdatePaymentForm payment={payment} store={store} navigation={navigation} />)
    .dive({ context: { store } })

  wrapper.simulate('submit', newTotal, newName, newDate, newSplitCount)

  expect(store.getActions()).toContainEqual(actions.getPaymentsRequest())
  expect(PaymentModel.updatePayment.mock.calls).toEqual([[updatedPayment]])
  expect(navigation.goBack.mock.calls).toHaveLength(1)
});
