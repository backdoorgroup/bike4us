import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Toolbar from "@mui/material/Toolbar"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"

import { useUserStore } from "@/stores"

export function NavBar() {
  const { user } = useUserStore()
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
            {user?.uid && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={user?.photoURL || ""}>{user?.displayName?.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user?.displayName || "Usuário sem nome"} secondary={user?.email} />
              </ListItem>
            )}
            {user?.uid && (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon>logout</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </ListItemButton>
              </ListItem>
            )}
            {!user?.uid && (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon>login</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Entrar" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Dialog>
      </Toolbar>
    </AppBar>
  )
}
