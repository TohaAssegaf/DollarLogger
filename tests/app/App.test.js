import React from 'react';
import App from '~/app/App';

import renderer from 'react-test-renderer';
//import mocked RNFirebase
import RNFirebase from 'react-native-firebase'

//reset mocks
beforeEach(() => {
  RNFirebase.reset()
})

//set mocked data
const ref = RNFirebase.firebase.database().ref('users/')
ref.data = users

//verify listener called
expect(ref.on.mock.calls.length).toBe(1)

it('renders without crashing', () => {
  const rendered = renderer.create( <App /> ).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders correctly', () => {
  const rendered = renderer.create( <App /> ).toJSON();
  expect(rendered).toMatchSnapshot();
});
