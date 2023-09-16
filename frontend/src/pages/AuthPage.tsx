import Container from "@mui/material/Container"

import { Outlet } from "react-router-dom"

export function AuthPage() {
  return (
    <Container sx={{ paddingY: 4 }}>
      <Outlet />
    </Container>
  )
}
