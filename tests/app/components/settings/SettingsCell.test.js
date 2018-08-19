import SettingsCell from '~/app/components/settings/SettingsCell'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<SettingsCell text='Test setting'
  />).toJSON();
  expect(rendered).toMatchSnapshot();
});
