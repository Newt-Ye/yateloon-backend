import * as React from "react"
import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { menuItems } from '../menuData';

import {
  /*useTranslate,*/
  MenuItemLink,
  useSidebarState,
  usePermissions,
  DashboardMenuItem
} from "react-admin"

import SubMenu from "./SubMenu"

const Menu = ({ dense = false }) => {
  const { isPending, permissions } = usePermissions();
  const [state, setState] = useState(
    menuItems.reduce((acc, menu) => {
      acc[menu.key] = true; // 預設選單展開
      return acc;
    }, {})
  );
  const [open] = useSidebarState()
  // const translate = useTranslate()

  // 當 permissions 變動時，重新設定選單狀態
  useEffect(() => {
    setState(menuItems.reduce((acc, menu) => {
      acc[menu.key] = true; // 這裡可以根據權限來決定哪些選單要展開
      return acc;
    }, {}));
  }, [permissions]);

  const handleToggle = menu => {
    setState(state => ({ ...state, [menu]: !state[menu] }))
  }

  const hasPermissionForResource = (resource) => {
    if (permissions === 'superuser') return true;
    return permissions && permissions[resource] && permissions[resource].view;
  }

  return isPending
    ? null
    : (
      <Box
        sx={{
          width: open ? 200 : 50,
          marginTop: 1,
          marginBottom: 1,
          transition: theme =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen
            })
        }}
      >
        <DashboardMenuItem />
        {menuItems.map((menu) => 
          (permissions === 'superuser' || Object.values(permissions).some(p => p.module === menu.key)) && (
          <SubMenu
            key={menu.key}
            handleToggle={() => handleToggle(menu.key)}
            isOpen={state[menu.key]}
            name={menu.name}
            icon={menu.icon}
            dense={dense}
          >
            {menu.items.map((item) => 
              hasPermissionForResource(item.resource) && (
                <MenuItemLink
                  key={item.resource}
                  to={`/${item.resource}`}
                  state={{ _scrollToTop: true }}
                  primaryText={item.primaryText}
                  dense={dense}
                />
              )
            )}
          </SubMenu>
        ))}
      </Box>
    )
}

export default Menu