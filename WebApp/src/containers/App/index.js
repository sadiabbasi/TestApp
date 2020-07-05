import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import URLSearchParams from 'url-search-params'
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import { setInitUrl } from "appRedux/actions/Auth";
import { onLayoutTypeChange, onNavStyleChange, setThemeType } from "appRedux/actions/Setting";
import NotificationContainer from '../../components/notification/notification';
import SignUp from "../SignUp";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";

const RestrictedRoute = ({ component: Component, location, token, publicUrl, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      (token || publicUrl === true)
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: { from: location }
          }}
        />}
  />;


const App = (props) => {

  const dispatch = useDispatch();
  const notificationProps = useSelector(state => state.notify);
  const { navStyle, layoutType } = useSelector(({ settings }) => settings);
  const { token, initURL } = useSelector(({ auth }) => auth);

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();


  useEffect(() => {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "/css/style.css";
    link.className = 'gx-style';
    document.body.appendChild(link);
  });

  useEffect(() => {
    if (initURL === '') {
      dispatch(setInitUrl(location.pathname));
    }
    const params = new URLSearchParams(location.search);

    if (params.has("theme")) {
      dispatch(setThemeType(params.get('theme')));
    }
    if (params.has("nav-style")) {
      dispatch(onNavStyleChange(params.get('nav-style')));
    }
    if (params.has("layout-type")) {
      dispatch(onLayoutTypeChange(params.get('layout-type')));
    }
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  }, [dispatch, initURL, layoutType, location.pathname, location.search, navStyle]);

  const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  const setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  useEffect(() => {
    if(token !== null){
    if(initURL !== '/' || initURL !== ''){
      if (initURL === '/signin' || initURL === '/signup') {
      }      
    }else {
      history.push(initURL);
    }
    }
  }, [initURL, history,props.history,token]);

  return (
      <IntlProvider>
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <RestrictedRoute path={`${match.url}`} token={token} 
            location={location}
            component={MainApp}
          />
        </Switch>
        <NotificationContainer position="top-right" status={notificationProps}
          updateAllState={() => {console.log("============ update State =======")}}
          onSuccessClose={() => {console.log("================== OnSuccessClose")}} />
      </IntlProvider>
  )
};

export default memo(App);
