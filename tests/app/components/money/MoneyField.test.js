import MoneyField from '~/app/components/money/MoneyField';
import enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import renderer from 'react-test-renderer'

enzyme.configure({ adapter: new Adapter() })
const onChange = jest.fn()

it('renders correctly', () => {
  const rendered = renderer.create(<MoneyField onChange={onChange} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('allows valid input', () => {
  const wrapper = shallow(<MoneyField onChange={onChange} />)
  const render = wrapper.dive()
  render.find('TextInput').simulate('changeText', '100')
  expect(wrapper.state().total).toEqual(10000)
  expect(onChange).toHaveBeenLastCalledWith(10000)
});

it('allows ambiguous input', () => {
  const wrapper = shallow(<MoneyField onChange={onChange} />)
  const render = wrapper.dive()
  render.find('TextInput').simulate('changeText', '100.')
  expect(wrapper.state().total).toEqual(10000)
  expect(onChange).toHaveBeenLastCalledWith(10000)
});

it('allows ambiguous . input', () => {
  const wrapper = shallow(<MoneyField onChange={onChange} />)
  const render = wrapper.dive()
  render.find('TextInput').simulate('changeText', '1') // Change to non-zero input first
  render.find('TextInput').simulate('changeText', '.')
  expect(wrapper.state().total).toEqual(0)
  expect(onChange).toHaveBeenLastCalledWith(0)
});

it('allows ambiguous <1 input', () => {
  const wrapper = shallow(<MoneyField onChange={onChange} />)
  const render = wrapper.dive()
  render.find('TextInput').simulate('changeText', '.37')
  expect(wrapper.state().total).toEqual(37)
  expect(onChange).toHaveBeenLastCalledWith(37)
});
