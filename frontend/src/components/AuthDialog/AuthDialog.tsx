import "./AuthDialog.scss"

import type { User } from "firebase/auth"

import { Link } from "react-router-dom"

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

export default function AuthDialog({
  user,
  open,
  handleSignIn,
  handleSignOut,
  handleClose,
  handleProfile
}: {
  user: User | null
  open: boolean
  handleSignIn: () => void
  handleSignOut: () => void
  handleClose: () => void
  handleProfile: () => void
}) {
  return (
    <Dialog className="auth-dialog" fullScreen open={open} onClose={handleClose}>
      <AppBar className="ad-app-bar" component="header" position="sticky" color="inherit" elevation={0}>
        <Toolbar className="adab-toolbar">
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <Icon>close</Icon>
          </IconButton>

          <Typography variant="h6">Conta</Typography>
        </Toolbar>
      </AppBar>

      <List disablePadding className="ad-list">
        {user?.uid && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} onClick={handleProfile} to="perfil">
                <ListItemAvatar>
                  <Avatar src={user?.photoURL || ""}>{user?.displayName?.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user?.displayName || "Usuário sem nome"}
                  secondary={user?.email || "Usuário sem email"}
                />
              </ListItemButton>
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
            <ListItemButton component={Link} onClick={handleSignIn} to="/auth/entrar">
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
