//App.js
import React from 'react'
import AppContainer from './src/navigation';
import { Provider } from 'react-redux';
import configureStore from './src/appRedux/store';

const store = configureStore(/ provide initial state if any /);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
  
}