import "./AppNavBottom.scss"

import { NavLink, useLocation } from "react-router-dom"
import clsx from "clsx"

import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Icon from "@mui/material/Icon"

export const AppNavBottomEnum = {
  Find: "/",
  Announce: "/anunciar",
  Profile: "/perfil"
} as const
export const AppNavBottomEnumValues = Object.values(AppNavBottomEnum)
export type TAppNavBottomEnumValues = (typeof AppNavBottomEnumValues)[number]

export default function AppNavBottom({ basic }: { basic?: boolean }) {
  const { pathname } = useLocation()

  return (
    <BottomNavigation
      className={clsx("app-nav-bottom", { hidden: basic })}
      component="footer"
      showLabels
      value={pathname}>
      <BottomNavigationAction
        label="Encontrar"
        component={NavLink}
        to={AppNavBottomEnum.Find}
        value={AppNavBottomEnum.Find}
        icon={<Icon>search</Icon>}
      />
      <BottomNavigationAction
        label="Anunciar"
        component={NavLink}
        to={AppNavBottomEnum.Announce}
        value={AppNavBottomEnum.Announce}
        icon={<Icon>add_circle_outline</Icon>}
      />
      <BottomNavigationAction
        label="Meus anúncios"
        component={NavLink}
        to={AppNavBottomEnum.Profile}
        value={AppNavBottomEnum.Profile}
        icon={<Icon>grid_view</Icon>}
      />
    </BottomNavigation>
  )
}
