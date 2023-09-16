// import { useParams } from "react-router-dom"

import Container from "@mui/material/Container"

import { AuthLogin } from "~/components"

export function AuthPage() {
  // const { step } = useParams()

  return (
    <Container sx={{ paddingY: 4 }}>
      <AuthLogin />
    </Container>
  )
}
