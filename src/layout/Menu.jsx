import * as React from "react"
import { useState } from "react"
import { Box } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';

import {
  /*useTranslate,*/
  MenuItemLink,
  useSidebarState
} from "react-admin"

import SubMenu from "./SubMenu"

const menuItems = [
  {
    key: "menuInventories",
    icon: <InventoryIcon />,
    name: "庫存管理",
    items: [
      { resource: "/inventory-item-categories", primaryText: "品號類別" },
      { resource: "/inventory-items", primaryText: "品號資料" }
    ]
  },
  {
    key: "menuSettings",
    name: "系統設定",
    icon: <SettingsIcon />,
    items: [
      { resource: "/users", primaryText: "登入者代號" },
      { resource: "/companies", primaryText: "公司資料" },
      /*{ resource: "/departments", primaryText: "部門權限" }*/
    ]
  }
];

const Menu = ({ dense = false }) => {
  const [state, setState] = useState(
    menuItems.reduce((acc, menu) => {
      acc[menu.key] = true; // 預設選單展開
      return acc;
    }, {})
  );
  const [open] = useSidebarState()
  // const translate = useTranslate()

  const handleToggle = menu => {
    setState(state => ({ ...state, [menu]: !state[menu] }))
  }

  return (
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
      {menuItems.map((menu) => (
        <SubMenu
          key={menu.key}
          handleToggle={() => handleToggle(menu.key)}
          isOpen={state[menu.key]}
          name={menu.name}
          icon={menu.icon}
          dense={dense}
        >
          {menu.items.map((item) => (
            <MenuItemLink
              key={item.resource}
              to={item.resource}
              state={{ _scrollToTop: true }}
              primaryText={item.primaryText}
              dense={dense}
            />
          ))}
        </SubMenu>
      ))}
    </Box>
  )
}

export default Menu