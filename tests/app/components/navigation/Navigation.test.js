import Navigation from '/app/components/navigation/Navigation'
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore([])

it('renders correctly', () => {
  const store = mockStore({ budget: { total: 0, isWriting: false, errorMessage: "" } })
  const rendered = renderer.create(<Provider store={store}><Navigation /></Provider>).toJSON()
  expect(rendered).toMatchSnapshot();
});
