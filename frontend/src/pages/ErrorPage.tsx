import { Link as RouterLink } from "react-router-dom"

import Icon from "@mui/material/Icon"
import Link from "@mui/material/Link"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export function ErrorPage() {
  return (
    <Container sx={{ paddingY: 4, textAlign: "center" }}>
      <Icon sx={{ color: "primary.main", fontSize: "64px", display: "block", marginX: "auto", mb: 2 }}>error</Icon>
      <Typography variant="h6">Esta página não está disponível</Typography>
      <Typography gutterBottom>Nos desculpe por isso.</Typography>
      <Link component={RouterLink} to="/">
        Ir para a página inicial
      </Link>
    </Container>
  )
}
