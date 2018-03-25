import React from 'react';
import Navigation from '/app/components/navigation/Navigation';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<Navigation />).toJSON();
  expect(rendered).toMatchSnapshot();
});
