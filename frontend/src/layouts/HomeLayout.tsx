import { Outlet } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"

export function LandingLayout() {
  return (
    <>
      <AppBar component="header" position="sticky" color="transparent" elevation={0}>
        <Toolbar>bike4us</Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  )
}
