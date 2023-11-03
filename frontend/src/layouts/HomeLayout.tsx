import Box from "@mui/material/Box"
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"

import { AppNavBar, AppNavBottom } from "@/components"

export function HomeLayout() {
  const { pathname } = useLocation()

  const basic = pathname.includes("auth")

  return (
    <>
      <ScrollRestoration />
      <AppNavBar basic={basic} />
      <Box component="main" sx={{ paddingBottom: 7 }}>
        <Outlet />
      </Box>
      {!basic && <AppNavBottom />}
    </>
  )
}
