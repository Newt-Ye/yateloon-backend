import * as React from "react"
import { useState } from "react"
import { Box } from "@mui/material"

import {
  // useTranslate,
  MenuItemLink,
  useSidebarState
} from "react-admin"

import inventoryItemCategories from "../inventoryItemCategories"
import SubMenu from "./SubMenu"

const Menu = ({ dense = false }) => {
  const [state, setState] = useState({
    menuCatalog: true,
    menuSales: true,
    menuCustomers: true
  })
  // const translate = useTranslate()
  const [open] = useSidebarState()

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
      <SubMenu
        handleToggle={() => handleToggle("menuInventoryItemCategories")}
        isOpen={state.menuInventoryItemCategories}
        // name="pos.menu.customers"
        name="庫存管理"
        icon={<inventoryItemCategories.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/inventory-item-categories"
          state={{ _scrollToTop: true }}
          // primaryText={translate(`resources.customers.name`, {
          //   smart_count: 2
          // })}
          primaryText="品號類別"
          leftIcon={<inventoryItemCategories.icon />}
          dense={dense}
        />
      </SubMenu>
      {/* <SubMenu
        handleToggle={() => handleToggle("menuUsers")}
        isOpen={state.menuUsers}
        // name="pos.menu.customers"
        name="帳號管理"
        icon={<users.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/users"
          state={{ _scrollToTop: true }}
          // primaryText={translate(`resources.customers.name`, {
          //   smart_count: 2
          // })}
          primaryText="帳號"
          leftIcon={<users.icon />}
          dense={dense}
        />
      </SubMenu> */}
    </Box>
  )
}

export default Menu