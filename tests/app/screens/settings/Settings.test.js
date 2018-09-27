import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import Settings from '~/app/screens/settings/Settings'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const store = mockStore({})
  const component = <Settings store={store} />
  const loggedInRender = renderer.create(component).toJSON()
  expect(loggedInRender).toMatchSnapshot()

});

it('triggers force update listener on logout', () => {
  const store = mockStore({})
  const component = <Settings store={store} />
  AuthUtils.logout()

  const loggedOutRender = renderer.create(component).toJSON()

  expect(loggedOutRender).toMatchSnapshot()

})
