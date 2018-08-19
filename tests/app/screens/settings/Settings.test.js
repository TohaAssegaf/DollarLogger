import Settings from '~/app/screens/settings/Settings'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<Settings />).toJSON();
  expect(rendered).toMatchSnapshot();
});
