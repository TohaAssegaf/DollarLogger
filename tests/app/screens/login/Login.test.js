import Login from '~/app/screens/login/Login'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const store = mockStore({})
  const rendered = renderer.create(<Provider store={store}><Login /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
});
