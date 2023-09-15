import Icon from "@mui/material/Icon"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export function HomePage() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "common.white" }}>
      <Container sx={{ paddingY: 2 }}>
        <Typography variant="h6" component="h1">
          Encontre o anunciado perfeito
        </Typography>
        <Typography variant="body2" component="h2" mb={2}>
          Descubra o padrão ouro em aluguel de bicicletas
        </Typography>

        <Card elevation={0} sx={{ padding: 2 }}>
          <Typography variant="h6" component="h3" mb={2}>
            Encontre um anunciado
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="O que você procura?"
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon>search</Icon>
                </InputAdornment>
              )
            }}
          />

          <Button fullWidth variant="contained" disableElevation>
            Encontrar
          </Button>
        </Card>
      </Container>
    </Box>
  )
}
