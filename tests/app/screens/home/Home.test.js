import Home from '~/app/screens/home/Home'
import MockDate from 'mockdate'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
jest.useFakeTimers()

it('renders correctly', () => {
  MockDate.set(new Date(2018, 3, 8))
  const store = mockStore({
    budget: { total: 25000 },
    payment: { payments: [
      {
        id: 1,
        total: 1,
        name: "Test payment",
        date: new Date(2018, 3, 8),
        paymentContributions: [
          {
            total: 1,
            date: new Date(2018, 3, 8),
            displayName: "Test payment",
            paymentId: 1,
          },
        ],
      }
    ]}})
  const rendered = renderer.create(
    <Provider store={store}><Home /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('does not include previous week payments', () => {
  MockDate.set(new Date(2018, 3, 9))
  const store = mockStore({
    budget: { total: 25000 },
    payment: { payments: [
      {
        id: 1,
        total: 1,
        name: "Test payment",
        date: new Date(2018, 3, 8),
        paymentContributions: [
          {
            total: 1,
            date: new Date(2018, 3, 8),
            displayName: "Test payment",
            paymentId: 1,
          },
        ],
      }
    ]}})
  const rendered = renderer.create(
    <Provider store={store}><Home /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
});
