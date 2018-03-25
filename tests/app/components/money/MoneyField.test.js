import MoneyField from '/app/components/money/MoneyField';
import enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import renderer from 'react-test-renderer'

enzyme.configure({ adapter: new Adapter() })

it('renders correctly', () => {
  const rendered = renderer.create(<MoneyField />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('allows valid input', () => {
  const wrapper = shallow(<MoneyField />)
  const render = wrapper.dive()
  render.find('TextInput').forEach(input => input.simulate('changeText', '100'))
  expect(wrapper.state().total).toEqual(10000)
});

it('allows ambiguous input', () => {
  const wrapper = shallow(<MoneyField />)
  const render = wrapper.dive()
  render.find('TextInput').forEach(input => input.simulate('changeText', '100.'))
  expect(wrapper.state().total).toEqual(10000)
});

it('allows ambiguous . input', () => {
  const wrapper = shallow(<MoneyField />)
  const render = wrapper.dive()
  render.find('TextInput').forEach(input => input.simulate('changeText', '.'))
  expect(wrapper.state().total).toEqual(0)
});

it('allows ambiguous <1 input', () => {
  const wrapper = shallow(<MoneyField />)
  const render = wrapper.dive()
  render.find('TextInput').forEach(input => input.simulate('changeText', '.37'))
  expect(wrapper.state().total).toEqual(37)
});
