import Icon from "@mui/material/Icon"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

export function SearchCard() {
  return (
    <Card elevation={0} sx={{ padding: 2 }}>
      <Typography gutterBottom variant="h6" component="h3">
        Encontre seu anunciado
      </Typography>

      <Stack mb={4}>
        <TextField
          fullWidth
          label="Buscar"
          placeholder="O que você procura?"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon>search</Icon>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <Button fullWidth disableElevation variant="contained">
        Encontrar
      </Button>
    </Card>
  )
}
