import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Box from "@mui/material/Box"

export function NavBottom() {
  return (
    <Box sx={{ borderTop: 1, borderColor: "lightgray", position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" />
      </BottomNavigation>
    </Box>
  )
}
