import "./HomeLayout.scss"

import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"

import Box from "@mui/material/Box"

import { AppNavBar, AppNavBottom } from "~/components"

export default function HomeLayout() {
  const { pathname } = useLocation()

  const basic = pathname.includes("auth")

  return (
    <Box className="home-layout">
      <ScrollRestoration />

      <AppNavBar basic={basic} />

      <Box className="hl-main" component="main">
        <Outlet />
      </Box>

      <AppNavBottom basic={basic} />
    </Box>
  )
}
