import * as Routes from '~/app/config/Routes'
import Navigation from '~/app/components/navigation/Navigation'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

it('renders correctly', () => {
  const store = mockStore({ budget: { isFetchComplete: false }})
  const rendered = renderer.create(<Provider store={store}><Navigation /></Provider>).toJSON()
  expect(rendered).toMatchSnapshot();
});
