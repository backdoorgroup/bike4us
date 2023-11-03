import "./AppNavBar.scss"

import { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Icon from "@mui/material/Icon"
import Link from "@mui/material/Link"
import Toolbar from "@mui/material/Toolbar"

import { AuthDialog } from "@/components"
import { AuthServices } from "@/services"
import { useUserStore } from "@/stores"

export default function AppNavBar({ basic }: { basic?: boolean }) {
  const { user } = useUserStore()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => setOpen(true)
  const handleCloseDialog = () => setOpen(false)

  const handleSignIn = () => {
    handleCloseDialog()
  }
  const handleSignOut = async () => {
    await AuthServices.signOut()

    navigate("/")
    handleCloseDialog()
  }

  return (
    <AppBar className="app-nav-bar" component="header" elevation={0}>
      <Toolbar className="anb-toolbar">
        <Link className="anbt-action" component={RouterLink} to="/">
          <Icon fontSize="inherit">directions_bike</Icon>
        </Link>

        {!basic && (
          <>
            <Icon className="anbt-action" onClick={handleOpenDialog}>
              account_circle
            </Icon>

            <AuthDialog
              user={user}
              open={open}
              handleSignIn={handleSignIn}
              handleSignOut={handleSignOut}
              handleClose={handleCloseDialog}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
