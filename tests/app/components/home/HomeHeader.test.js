import HomeHeader from '/app/components/home/HomeHeader'
import React from 'react';
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const store = mockStore({ budget: { total: 25000 }, payment: { payments: [] }})
  const rendered = renderer.create(<HomeHeader store={store} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
