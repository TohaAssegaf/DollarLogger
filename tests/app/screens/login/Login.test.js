import actions from '~/app/actions'
import Login from '~/app/screens/login/Login'
import enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

enzyme.configure({ adapter: new Adapter() })
const navigation = { goBack: jest.fn() }
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders correctly', () => {
  const store = mockStore({})
  const rendered = renderer.create(<Provider store={store}><Login /></Provider>).toJSON();
  expect(rendered).toMatchSnapshot();
})

it('dispatches sync payments action and navigates back', () => {
  const store = mockStore({})
  const wrapper = shallow(<Login store={store} navigation={navigation} />)
    .dive({ context: { store } })

  wrapper.find('FBAuthButton').simulate('loginComplete')

  expect(store.getActions()).toContainEqual(actions.getPaymentsRequest())
  expect(navigation.goBack.mock.calls).toHaveLength(1)
})
