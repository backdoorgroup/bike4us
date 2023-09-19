import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"

export function NavBar() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <AppBar
      component="header"
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "lightgray" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link component={RouterLink} to="/" sx={{ fontSize: 24, height: 24, width: 24, color: "text.primary" }}>
          <Icon fontSize="inherit">directions_bike</Icon>
        </Link>

        <Icon sx={{ fontSize: 24, height: 24, width: 24 }} onClick={handleClickOpen}>
          account_circle
        </Icon>
        <Dialog fullScreen open={open} onClose={handleClose}>
          <AppBar
            component="header"
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: 1, borderColor: "lightgray" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
              <Typography sx={{ ml: 2 }} variant="h6">
                Conta
              </Typography>
            </Toolbar>
          </AppBar>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>login</Icon>
                </ListItemIcon>
                <ListItemText primary="Entrar" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </ListItem>
          </List>
        </Dialog>
      </Toolbar>
    </AppBar>
  )
}
