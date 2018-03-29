import Home from '/app/screens/home/Home'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const store = mockStore({})
  const rendered = renderer.create(<Home store={store} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
