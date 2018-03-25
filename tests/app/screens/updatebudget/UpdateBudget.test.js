import React from 'react';
import UpdateBudget from '/app/screens/updatebudget/UpdateBudget';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<UpdateBudget />).toJSON();
  expect(rendered).toMatchSnapshot();
});
