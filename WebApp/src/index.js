import React from "react";
import ReactDOM from "react-dom";

import NextApp from './NextApp';
import {AppContainer} from 'react-hot-loader';

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render once
render(NextApp);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./NextApp', () => {
    render(NextApp);
  });
}
