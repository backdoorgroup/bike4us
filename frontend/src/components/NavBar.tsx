import { Link as RouterLink } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Icon from "@mui/material/Icon"
import Link from "@mui/material/Link"

export function NavBar() {
  return (
    <AppBar
      component="header"
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "lightgray" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          component={RouterLink}
          to="/"
          sx={{ fontSize: "24px", height: "24px", width: "24px", color: "text.primary" }}>
          <Icon fontSize="inherit">directions_bike</Icon>
        </Link>

        <Link
          component={RouterLink}
          to="/"
          sx={{ fontSize: "24px", height: "24px", width: "24px", color: "text.primary" }}>
          <Icon fontSize="inherit">account_circle</Icon>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
