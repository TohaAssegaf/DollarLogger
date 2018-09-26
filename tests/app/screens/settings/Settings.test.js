import * as AuthUtils from '~/app/lib/auth/AuthUtils'
import Settings from '~/app/screens/settings/Settings'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const component = <Settings />
  const loggedInRender = renderer.create(component).toJSON()
  expect(loggedInRender).toMatchSnapshot()

  AuthUtils.logout()
  const loggedOutRender = renderer.create(component).toJSON()
  expect(loggedOutRender).toMatchSnapshot()
});
