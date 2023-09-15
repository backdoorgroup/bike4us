import Icon from "@mui/material/Icon"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

export function HomePage() {
  return (
    <Box>
      <Container sx={{ marginY: 4 }}>
        <TextField
          fullWidth
          placeholder="Encontrar"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon>search</Icon>
              </InputAdornment>
            )
          }}
        />
      </Container>
    </Box>
  )
}
