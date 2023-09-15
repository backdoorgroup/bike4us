import Icon from "@mui/material/Icon"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export function SearchCard() {
  return (
    <Card elevation={0} sx={{ padding: 2 }}>
      <Typography variant="h6" component="h3" mb={1}>
        Encontre um anunciado
      </Typography>

      {/* TODO: isso deve tá em volta de um form */}
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

      <Button fullWidth disableElevation variant="contained">
        Encontrar
      </Button>
    </Card>
  )
}
