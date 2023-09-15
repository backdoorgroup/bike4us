import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import { NavBar, NavBottom } from "~/components"

export function LandingLayout() {
  return (
    <>
      <NavBar />
      <Box component="main" sx={{ marginBottom: 7 }}>
        <Outlet />
      </Box>
      <NavBottom />
    </>
  )
}
