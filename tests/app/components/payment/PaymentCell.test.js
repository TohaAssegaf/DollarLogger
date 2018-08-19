import PaymentCell from '~/app/components/payment/PaymentCell'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<PaymentCell payment={{
    name: "Test payment",
    total: 100,
    date: new Date(2018, 4, 2)}}
  />).toJSON();
  expect(rendered).toMatchSnapshot();
});
