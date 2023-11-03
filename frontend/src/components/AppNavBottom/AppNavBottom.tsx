import "./AppNavBottom.scss"

import { NavLink, useLocation } from "react-router-dom"

import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Icon from "@mui/material/Icon"

const NavigationEnum = {
  Find: "/",
  Announce: "/anunciar"
} as const

export default function AppNavBottom() {
  const { pathname } = useLocation()

  return (
    <BottomNavigation className="app-nav-bottom" component="footer" showLabels value={pathname}>
      <BottomNavigationAction
        label="Encontrar"
        component={NavLink}
        to={NavigationEnum.Find}
        value={NavigationEnum.Find}
        icon={<Icon>search</Icon>}
      />
      <BottomNavigationAction
        label="Anunciar"
        component={NavLink}
        to={NavigationEnum.Announce}
        value={NavigationEnum.Announce}
        icon={<Icon>add_circle_outline</Icon>}
      />
      {/* TODO: ter uma página de perfil, pra ver o perfil do usuário e os anúncios dele */}
      {/* <BottomNavigationAction
        label="Anúncios"
        component={NavLink}
        to={NavigationEnum.Profile}
        value={NavigationEnum.Profile}
        icon={<Icon>grid_view</Icon>}
      /> */}
    </BottomNavigation>
  )
}
