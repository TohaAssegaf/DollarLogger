import actions from '/app/actions'
import AddPaymentForm from '/app/components/payment/AddPaymentForm'
import enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MockDate from 'mockdate'
import React from 'react'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'

enzyme.configure({ adapter: new Adapter() })
const navigation = { goBack: jest.fn() }
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  MockDate.set(new Date(Date.UTC(2018, 4, 2)))
  const store = mockStore({})
  const rendered = renderer.create(<AddPaymentForm store={store} navigation={navigation} />)
      .toJSON();
  expect(rendered).toMatchSnapshot();
});

it('dispatches add payment action and navigates back', () => {
  const store = mockStore({})
  const wrapper = shallow(<AddPaymentForm store={store} navigation={navigation} />)
      .dive({ context: { store } })
  const render = wrapper.dive()
  const expectedTotal = 10000
  const expectedName = "Test payment"
  const expectedDate = new Date(2018, 4, 2)

  expect(wrapper.state().total).toEqual(0)
  expect(wrapper.state().name).toEqual("")

  render.find('MoneyField').simulate('change', expectedTotal)
  render.find('TextInput').simulate('change', expectedName)
  render.find('DatePicker').simulate('dateChange', expectedDate)

  expect(wrapper.state().total).toEqual(expectedTotal)
  expect(wrapper.state().name).toEqual(expectedName)
  expect(wrapper.state().date).toEqual(expectedDate)

  render.find('Button').simulate('press')

  expect(store.getActions()).toContainEqual(actions.createPaymentRequest())
  expect(navigation.goBack.mock.calls).toHaveLength(1)
});
