import PaymentBuilder from '~/app/lib/PaymentBuilder'
import History from '~/app/screens/history/History'
import MockDate from 'mockdate'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  MockDate.set(new Date(2018, 3, 8))
  const payment1 =
    new PaymentBuilder().setTotal(1).setName("Test payment").setDate(new Date(2018, 3, 7)).build()
  const payment2 =
    new PaymentBuilder()
      .setTotal(1)
      .setName("Test payment 2")
      .setDate(new Date(2018, 3, 8))
      .setSplitCount(2)
      .build()
  const store = mockStore({
    budget: { total: 25000 },
    payment: { payments: [payment1, payment2] }
  })
  const rendered = renderer.create(
    <Provider store={store}><History /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
});
