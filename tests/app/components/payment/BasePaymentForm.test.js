import BasePaymentForm from '~/app/components/payment/BasePaymentForm'
import enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MockDate from 'mockdate'
import React from 'react'
import renderer from 'react-test-renderer'

enzyme.configure({ adapter: new Adapter() })

it('renders correctly', () => {
  MockDate.set(new Date(Date.UTC(2018, 4, 2)))
  const rendered = renderer.create(<BasePaymentForm onSubmit={() => {}}/>).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('dispatches given action and navigates back', () => {
  const mockSubmitCallback = jest.fn()
  const wrapper = shallow(
    <BasePaymentForm
      onSubmit={
        (total, name, date, splitCount) => mockSubmitCallback(total, name, date, splitCount)}
    />)
  const expectedTotal = 10000
  const expectedName = "Test payment"
  const expectedDate = new Date(2018, 4, 2)
  const expectedSplitCount = 3

  expect(wrapper.state().total).toEqual(0)
  expect(wrapper.state().name).toEqual("")
  expect(wrapper.state().splitCount).toEqual("")

  console.log("BASE PAYMENT FORM DEBUG")
  console.log(wrapper.debug())

  wrapper.find('MoneyField').simulate('change', expectedTotal)
  wrapper.find('TextInput').at(0).simulate('changeText', expectedName)
  wrapper.find('DatePicker').simulate('dateChange', expectedDate)
  wrapper.find('TextInput').at(1).simulate('changeText', expectedSplitCount.toString())

  expect(wrapper.state().total).toEqual(expectedTotal)
  expect(wrapper.state().name).toEqual(expectedName)
  expect(wrapper.state().date).toEqual(expectedDate)
  expect(wrapper.state().splitCount).toEqual(expectedSplitCount.toString())

  wrapper.find('Button').simulate('press')

  expect(mockSubmitCallback.mock.calls).toEqual(
    [[expectedTotal, expectedName, expectedDate, expectedSplitCount]])
});
