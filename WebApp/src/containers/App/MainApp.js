import React from "react";
import {Layout} from "antd";
import Sidebar from "../Sidebar/index";
import Topbar from "../Topbar/index";
import {footerText} from "util/config";
import App from "routes/index";
import {useSelector} from "react-redux";
import {
  NAV_STYLE_FIXED,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import {useRouteMatch} from "react-router-dom";
const {Content, Footer} = Layout;

const MainApp = (props) => {

  const {width, navStyle} = useSelector(({settings}) => settings);
  const match = useRouteMatch();

  const getNavStyles = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_FIXED :
        return <Topbar/>;
      default :
        return null;
    }
  };

  const getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar {...props} />;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED :
        return <Sidebar {...props} />;
      default :
        return null;
    }
  };


  return (
    <Layout className="gx-app-layout">
      {getSidebar(navStyle, width)}
      <Layout>
        {getNavStyles(navStyle)}
        <Content className={`gx-layout-content `}>
          <App match={match}/>
          <Footer>
            <div className="gx-layout-footer-content">
              {footerText}
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  )
};
export default MainApp;

