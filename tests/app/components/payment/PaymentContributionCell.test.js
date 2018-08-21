import PaymentContributionCell from '~/app/components/payment/PaymentContributionCell'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<PaymentContributionCell paymentContribution={{
    displayName: "Test payment",
    total: 100,
    date: new Date(2018, 4, 2),
    paymentId: 1
  }}
  />).toJSON();
  expect(rendered).toMatchSnapshot();
});
