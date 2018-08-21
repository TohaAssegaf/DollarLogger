import PaymentContributionList from '~/app/components/payment/PaymentContributionList'
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const rendered = renderer.create(<PaymentContributionList paymentContributions={[
    {
      displayName: "Test payment (1/2)",
      total: 100,
      date: new Date(2018, 4, 2),
      id: 1
    },
    {
      displayName: "Test payment (2/2)",
      total: 100,
      date: new Date(2018, 4, 9),
      id: 1
    },
  ]}
  />).toJSON();
  expect(rendered).toMatchSnapshot();
});
