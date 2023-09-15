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
      <Typography variant="h6" component="h3" mb={2}>
        Encontre seu anunciado
      </Typography>

      {/* TODO: isso deve tá em volta de um form */}
      <TextField
        fullWidth
        label="Buscar"
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
      <Stack direction="row" gap="8px" sx={{ marginBottom: 3 }}>
        <DateTimePicker label="Retirada" views={["day", "month", "year"]} sx={{ marginBottom: 1, width: "100%" }} />
        <DateTimePicker label="Devolução" views={["day", "month", "year"]} sx={{ marginBottom: 1, width: "100%" }} />
      </Stack>

      <Button fullWidth disableElevation variant="contained">
        Encontrar
      </Button>
    </Card>
  )
}
