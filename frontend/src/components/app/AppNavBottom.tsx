import type { SyntheticEvent } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Icon from "@mui/material/Icon"

const NavigationEnum = {
  Find: "/",
  Announce: "/anunciar",
  Profile: "/perfil"
} as const
const NavigationPaths = Object.values(NavigationEnum)
type TNavigation = (typeof NavigationEnum)[keyof typeof NavigationEnum]

export function AppNavBottom() {
  const location = useLocation()

  const [page, setPage] = useState(location.pathname)

  const handleChange = (_: SyntheticEvent, value: TNavigation) => {
    if (!NavigationPaths.includes(value)) return

    setPage(value)
  }

  return (
    <BottomNavigation
      sx={{ borderTop: 1, borderColor: "lightgray", position: "fixed", bottom: 0, left: 0, right: 0 }}
      component="footer"
      showLabels
      value={page}
      onChange={handleChange}>
      <BottomNavigationAction
        label="Encontrar"
        component={Link}
        to={NavigationEnum.Find}
        value={NavigationEnum.Find}
        icon={<Icon>search</Icon>}
      />
      <BottomNavigationAction
        label="Anunciar"
        component={Link}
        to={NavigationEnum.Announce}
        value={NavigationEnum.Announce}
        icon={<Icon>add_circle_outline</Icon>}
      />
      <BottomNavigationAction
        label="Anúncios"
        component={Link}
        to={NavigationEnum.Profile}
        value={NavigationEnum.Profile}
        icon={<Icon>grid_view</Icon>}
      />
    </BottomNavigation>
  )
}
