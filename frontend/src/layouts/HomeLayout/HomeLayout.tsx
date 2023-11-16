import "./HomeLayout.scss"

import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import clsx from "clsx"

import Box from "@mui/material/Box"

import { AppNavBar, AppNavBottom } from "~/components"

export default function HomeLayout() {
  const { pathname } = useLocation()

  const basic = pathname.includes("auth")

  return (
    <Box className="home-layout">
      <ScrollRestoration />

      <AppNavBar basic={basic} />

      <Box className={clsx("hl-main", { basic })} component="main">
        <Outlet />
      </Box>

      <AppNavBottom basic={basic} />
    </Box>
  )
}
