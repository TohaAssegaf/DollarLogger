import actions from '~/app/actions'
import DeletePaymentButton from '~/app/components/payment/DeletePaymentButton'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import * as PaymentModel from '~/app/store/models/payment'
import enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Alert } from 'react-native'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'

enzyme.configure({ adapter: new Adapter() })
const navigation = { goBack: jest.fn() }
Alert.alert = jest.fn()
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const payment = {
    id: 1,
    total: 1000,
    name: "Test payment",
    date: new Date(2018, 4, 3)
  }
  const store = mockStore({ payment: { payments: [payment] } })
  const rendered = renderer.create(<DeletePaymentButton
    payment={payment}
    store={store}
    navigation={navigation}
  />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('dispatches delete payment action and navigates back', () => {
  const spy = jest.spyOn(PaymentModel, 'deletePayment')
  const payment = new PaymentBuilder()
    .setTotal(10000)
    .setName("Test payment")
    .setDate(new Date(2018, 4, 2))
    .build()
  const store = mockStore({ payment: { payments: [payment] } })
  const wrapper = shallow(
    <DeletePaymentButton
      payment={payment}
      store={store}
      navigation={navigation}
    />).dive({ context: { store } })

  wrapper.find('Button').simulate('press')

  // Simulate pressing OK on Alert.
  Alert.alert.mock.calls[0][2][1].onPress()

  expect(store.getActions()).toContainEqual(actions.getPaymentsRequest())
  expect(spy).toBeCalledWith(payment.id)
  expect(navigation.goBack.mock.calls).toHaveLength(1)
});
