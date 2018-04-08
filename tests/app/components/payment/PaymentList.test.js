import PaymentList from '/app/components/payment/PaymentList'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<PaymentList payment={[
    {
      name: "Test payment 1",
      total: 100,
      date: new Date(2018, 4, 2)
    },
    {
      name: "Test payment 2",
      total: 200,
      date: new Date(2018, 4, 3)
    },
  ]}
  />).toJSON();
  expect(rendered).toMatchSnapshot();
});
