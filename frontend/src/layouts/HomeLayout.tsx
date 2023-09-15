import { Outlet } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Icon from "@mui/material/Icon"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
// import Button from "@mui/material/Button"

export function LandingLayout() {
  return (
    <>
      <AppBar
        component="header"
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "lightgray" }}>
        <Toolbar>
          <Icon sx={{ marginRight: 2 }}>directions_bike</Icon>
          <TextField
            fullWidth
            size="small"
            placeholder="Encontrar"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon>search</Icon>
                </InputAdornment>
              )
            }}
          />
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  )
}
