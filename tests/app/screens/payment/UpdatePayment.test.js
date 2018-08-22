import UpdatePayment from '~/app/screens/payment/UpdatePayment'
import PaymentBuilder from '~/app/lib/PaymentBuilder'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const payment =
    new PaymentBuilder()
      .setId(1)
      .setTotal(1000)
      .setName("Test payment")
      .setDate(new Date(2018, 4, 3))
      .setSplitCount(4)
      .build()
  const store = mockStore({ payment: { payments: [payment] } })
  const rendered = renderer.create(
    <Provider store={store}>
      <UpdatePayment navigation={{ state: { params: { payment } } }} />
    </Provider>
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});
