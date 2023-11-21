import "./HomeLayout.scss"

import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import { useMemo } from "react"
import clsx from "clsx"

import Box from "@mui/material/Box"

import type { TAppNavBottomEnumValues } from "~/components"
import { AppNavBar, AppNavBottom, AppNavBottomEnumValues } from "~/components"

export default function HomeLayout() {
  const { pathname } = useLocation()

  const basic = useMemo(() => !AppNavBottomEnumValues.includes(pathname as TAppNavBottomEnumValues), [pathname])

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
