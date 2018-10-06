import HomeWeekDetails from '~/app/components/home/HomeWeekDetails'
import MockDate from 'mockdate'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const date = new Date(2018, 3, 8)
  MockDate.set(date)
  const store = mockStore({
    budget: { total: 25000 },
    payment: { payments: [
      {
        id: 1,
        total: 1,
        name: "Test payment",
        date,
        paymentContributions: [
          {
            total: 1,
            date,
            displayName: "Test payment",
            paymentId: 1,
          },
        ],
      }
    ]}})
  const rendered = renderer.create(
    <Provider store={store}><HomeWeekDetails date={date} /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('does not include previous week payments', () => {
  const oldDate = new Date(2018, 3, 8)
  const currentDate = new Date(2018, 3, 9)
  MockDate.set(currentDate)
  const store = mockStore({
    budget: { total: 25000 },
    payment: { payments: [
      {
        id: 1,
        total: 1,
        name: "Test payment",
        date: oldDate,
        paymentContributions: [
          {
            total: 1,
            date: oldDate,
            displayName: "Test payment",
            paymentId: 1,
          },
        ],
      }
    ]}})
  const rendered = renderer.create(
    <Provider store={store}><HomeWeekDetails date={currentDate} /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
});
