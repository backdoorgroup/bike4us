import "./ErrorPage.scss"

import { Link as RouterLink } from "react-router-dom"

import Icon from "@mui/material/Icon"
import Link from "@mui/material/Link"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

export default function ErrorPage() {
  return (
    <Container className="error-page">
      <Icon className="ep-icon">error</Icon>

      <Typography variant="h6">Esta página não está disponível</Typography>

      <Typography gutterBottom>Nos desculpe por isso.</Typography>

      <Link component={RouterLink} to="/">
        Ir para a página inicial
      </Link>
    </Container>
  )
}
