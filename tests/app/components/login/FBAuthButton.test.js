import FBAuthButton from '~/app/components/login/FBAuthButton'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(
    <FBAuthButton onLoginComplete={() => {}}/>).toJSON();
  expect(rendered).toMatchSnapshot();
})
