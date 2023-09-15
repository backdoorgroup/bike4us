import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Icon from "@mui/material/Icon"

export function NavBar() {
  return (
    <AppBar
      component="header"
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "lightgray" }}>
      <Toolbar>
        <Icon sx={{ marginRight: 2 }}>directions_bike</Icon>
      </Toolbar>
    </AppBar>
  )
}
