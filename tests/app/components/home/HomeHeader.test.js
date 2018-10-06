import HomeHeader from '~/app/components/home/HomeHeader'
import MockDate from 'mockdate'
import React from 'react';
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer';
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
        date: date,
        paymentContributions: [
          {
            total: 1,
            date: date,
          },
        ],
      }
    ]}})
  const rendered = renderer.create(<HomeHeader store={store} date={date}/>).toJSON();
  expect(rendered).toMatchSnapshot();
});
