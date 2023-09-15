import { useState } from "react"

import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Icon from "@mui/material/Icon"

export function NavBottom() {
  const [value, setValue] = useState(0)

  return (
    <BottomNavigation
      sx={{ borderTop: 1, borderColor: "lightgray", position: "fixed", bottom: 0, left: 0, right: 0 }}
      component="footer"
      showLabels
      value={value}
      onChange={(_, value) => setValue(value)}>
      <BottomNavigationAction label="Encontrar" icon={<Icon>search</Icon>} />
      <BottomNavigationAction label="Anunciar" icon={<Icon>add_circle_outline</Icon>} />
      <BottomNavigationAction label="Meus anúncios" icon={<Icon>grid_view</Icon>} />
    </BottomNavigation>
  )
}
