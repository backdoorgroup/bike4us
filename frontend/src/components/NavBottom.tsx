import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"

export function NavBottom() {
  return (
    <BottomNavigation
      sx={{ borderTop: 1, borderColor: "lightgray", position: "fixed", bottom: 0, left: 0, right: 0 }}
      component="footer"
      showLabels>
      <BottomNavigationAction label="Home" />
    </BottomNavigation>
  )
}
