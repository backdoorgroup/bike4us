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
      <Toolbar>
        <Link component={RouterLink} to="/" sx={{ width: "24px", height: "24px" }}>
          <Icon fontSize="inherit">directions_bike</Icon>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
