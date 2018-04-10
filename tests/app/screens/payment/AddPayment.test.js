import AddPayment from '/app/screens/payment/AddPayment'
import MockDate from 'mockdate'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  MockDate.set(new Date(2018, 4, 3))
  const store = mockStore({})
  const rendered = renderer.create(<Provider store={store}><AddPayment /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
});
