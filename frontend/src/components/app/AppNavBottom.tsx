import type { SyntheticEvent } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Icon from "@mui/material/Icon"

interface Props {
  basic?: boolean
}

const NavigationEnum = {
  Find: "/",
  Announce: "/anunciar"
} as const
const NavigationPaths = Object.values(NavigationEnum)
type TNavigation = (typeof NavigationEnum)[keyof typeof NavigationEnum]

export function AppNavBottom({ basic }: Props) {
  const { pathname } = useLocation()

  const [path, setPath] = useState(pathname)

  const handleChange = (_: SyntheticEvent, path: TNavigation) => {
    if (!NavigationPaths.includes(path)) return

    setPath(path)
  }

  return (
    <BottomNavigation
      sx={{
        borderTop: 1,
        borderColor: "lightgray",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: basic ? "none" : null
      }}
      component="footer"
      showLabels
      value={path}
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
      {/* TODO: ter uma página de perfil, pra ver o perfil do usuário e os anúncios dele */}
      {/* <BottomNavigationAction
        label="Anúncios"
        component={Link}
        to={NavigationEnum.Profile}
        value={NavigationEnum.Profile}
        icon={<Icon>grid_view</Icon>}
      /> */}
    </BottomNavigation>
  )
}
