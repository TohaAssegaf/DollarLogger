import actions from '~/app/actions'
import parseAmbiguousMoney from '~/app/lib/parseAmbiguousMoney'
import UpdateBudget from '~/app/screens/updatebudget/UpdateBudget'
import enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react';
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

enzyme.configure({ adapter: new Adapter() })
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const navigation = {
  goBack: jest.fn(),
  getParam: jest.fn(),
}

it('renders correctly', () => {
  const store = mockStore({ budget: { total: 0, isWriting: false, errorMessage: "" } })
  const rendered = renderer.create(<UpdateBudget store={store} navigation={navigation} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('dispatches request on submit', () => {
  const store = mockStore({ budget: { total: 0, isWriting: false, errorMessage: "" } })
  const wrapper = shallow(<UpdateBudget store={store} navigation={navigation} />)
      .dive({ context: { store } })
  const render = wrapper.dive()
  const expectedTotal = 10000

  expect(wrapper.state().total).toEqual(0)

  render.find('MoneyField').simulate('change', expectedTotal)

  expect(wrapper.state().total).toEqual(expectedTotal)

  render.find('Button').simulate('press')

  expect(store.getActions()).toContainEqual(actions.setBudgetTotalRequest())
  expect(navigation.goBack.mock.calls).toHaveLength(1)
});
