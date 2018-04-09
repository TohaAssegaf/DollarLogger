import Home from '/app/screens/home/Home'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const store = mockStore({ budget: { total: 25000 }, payment: { payments: [] }})
  const rendered = renderer.create(
    <Provider store={store}><Home /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
});
