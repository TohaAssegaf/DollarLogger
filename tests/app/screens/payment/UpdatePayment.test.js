import UpdatePayment from '~/app/screens/payment/UpdatePayment'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const payment = { id: 1, total: 1000, name: "Test payment", date: new Date(2018, 4, 3) }
  const store = mockStore({ payment: { payments: [payment] } })
  const rendered = renderer.create(
    <Provider store={store}>
      <UpdatePayment navigation={{ state: { params: { payment } } }} />
    </Provider>
  ).toJSON();
  expect(rendered).toMatchSnapshot();
});
