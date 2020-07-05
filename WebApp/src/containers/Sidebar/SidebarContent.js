import React from "react";
import {useSelector} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import { THEME_TYPE_LITE} from "../../constants/ThemeSetting";
import { useDispatch } from 'react-redux';
import {userSignOut} from "../../appRedux/actions/Auth";
import MenuItems from "./menuItems";

const SidebarContent = ({...props}) => {
  let { themeType, pathname} = useSelector(({settings}) => settings);
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  const dispatch = useDispatch();
  return (
    <>
      <div className="gx-layout-sider-header">
        <h3 className="gx-text-white">Booking Appointment</h3>
      </div>
      <div className="gx-sidebar-content gx-py-3 dark-theme">
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
            {
              MenuItems.map(menu => {
                return (
                  <Menu.Item key={menu.title}>
                    <Link to={`/${menu.link}`}><i className="icon icon-widgets"/>{menu.title}</Link>
                  </Menu.Item>
                )
              })
            }
            <Menu.Item key="logout"  onClick={() => dispatch(userSignOut())}>
              <i className="icon icon-widgets"/>Logout
            </Menu.Item>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;