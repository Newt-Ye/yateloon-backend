import * as React from "react"
import {
  List,
  MenuItem,
  ListItemIcon,
  Typography,
  Collapse,
  Tooltip
} from "@mui/material"
import { /*useTranslate, */useSidebarState } from "react-admin"

const SubMenu = props => {
  const { handleToggle, isOpen, name, icon, children, dense } = props
  // const translate = useTranslate()

  const [sidebarIsOpen] = useSidebarState()

  const header = (
    <MenuItem dense={dense} onClick={handleToggle}>
      <ListItemIcon sx={{ minWidth: 5 }}>
        {icon}
      </ListItemIcon>
      <Typography variant="inherit" color="textSecondary">
        {/* {translate(name)} */}
        {name}
      </Typography>
    </MenuItem>
  )

  return (
    <div>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        // <Tooltip title={translate(name)} placement="right">
        <Tooltip title={name} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          sx={{
            "& .MuiMenuItem-root": {
              transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              paddingLeft: theme =>
                sidebarIsOpen ? theme.spacing(4) : theme.spacing(2)
            }
          }}
        >
          {children}
        </List>
      </Collapse>
    </div>
  )
}

export default SubMenu