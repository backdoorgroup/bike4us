import Icon from "@mui/material/Icon"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

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

      <Stack gap={2} mb={4}>
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
        <DateTimePicker disablePast label="Retirada" sx={{ width: "100%" }} />
        <DateTimePicker disablePast label="Devolução" sx={{ width: "100%" }} />
      </Stack>

      <Button fullWidth disableElevation variant="contained">
        Encontrar
      </Button>
    </Card>
  )
}
