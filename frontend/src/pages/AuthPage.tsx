import { Outlet } from "react-router-dom"

import Container from "@mui/material/Container"

export function AuthPage() {
  return (
    <Container sx={{ paddingY: 4 }}>
      <Outlet />
    </Container>
  )
}
