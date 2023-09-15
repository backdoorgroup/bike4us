import { Outlet } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Icon from "@mui/material/Icon"

export function LandingLayout() {
  return (
    <>
      <AppBar
        component="header"
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "lightgray" }}>
        <Toolbar>
          <Icon>directions_bike</Icon>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  )
}
