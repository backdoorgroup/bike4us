import { Outlet } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Icon from "@mui/material/Icon"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"

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
          <IconButton size="small" sx={{ marginRight: 1 }}>
            <Icon fontSize="inherit">directions_bike</Icon>
          </IconButton>
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
          <IconButton size="small" sx={{ marginLeft: 1 }}>
            <Icon fontSize="inherit">login</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  )
}
