import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import { AppNavBar } from "@/components"

export function LandingLayout() {
  return (
    <>
      <AppNavBar />
      <Box component="main">
        <Outlet />
      </Box>
    </>
  )
}
