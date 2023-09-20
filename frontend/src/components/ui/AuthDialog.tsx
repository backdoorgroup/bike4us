import type { User } from "firebase/auth"

import { Link as RouterLink } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Dialog from "@mui/material/Dialog"
import Divider from "@mui/material/Divider"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

interface Props {
  user: User | null
  open: boolean
  handleSignIn: () => void
  handleSignOut: () => void
  handleClose: () => void
}

export function AuthDialog({ user, open, handleSignIn, handleSignOut, handleClose }: Props) {
  return (
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
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={user?.photoURL || ""}>{user?.displayName?.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user?.displayName || "Usuário sem nome"}
                secondary={user?.email || "Usuário sem email"}
              />
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {!user?.uid && (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} onClick={handleSignIn} to="/auth" sx={{ color: "text.primary" }}>
              <ListItemIcon>
                <Icon>login</Icon>
              </ListItemIcon>
              <ListItemText primary="Entrar" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Dialog>
  )
}
