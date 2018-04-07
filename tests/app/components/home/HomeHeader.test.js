import HomeHeader from '/app/components/home/HomeHeader'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<HomeHeader />).toJSON();
  expect(rendered).toMatchSnapshot();
});
