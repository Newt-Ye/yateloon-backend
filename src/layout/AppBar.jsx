import * as React from "react"
import { AppBar/*, TitlePortal*/ } from "react-admin"
import { Box, useMediaQuery } from "@mui/material"
import logo from '../assets/logo.png';

import { AppBarToolbar } from "./AppBarToolbar"

const CustomAppBar = () => {
  const isLargeEnough = useMediaQuery(theme => theme.breakpoints.up("sm"))
  return (
    <AppBar 
      color="primary" 
      toolbar={<AppBarToolbar />}
      sx={{
        '& .RaAppBar-menuButton': { display: isLargeEnough ? "none" : "block" },
      }}
    >
      {/* <TitlePortal /> */}
      {isLargeEnough && 
        <Box
          component="img"
          src={logo} // 設定 logo 路徑
          alt="logo"
          sx={{ height: 32, width: 'auto', marginTop: 1, marginBottom: 1  }} // 調整 logo 的大小
        />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  )
}

export default CustomAppBar