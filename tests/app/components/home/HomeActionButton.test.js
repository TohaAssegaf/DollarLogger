import HomeActionButton from '/app/components/home/HomeActionButton'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<HomeActionButton />).toJSON();
  expect(rendered).toMatchSnapshot();
});
