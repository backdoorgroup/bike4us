import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"

import { AppNavBar } from "@/components"

export function BasicLayout() {
  return (
    <>
      <AppNavBar />
      <Box component="main">
        <Outlet />
      </Box>
    </>
  )
}
