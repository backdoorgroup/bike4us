import { useState } from "react"

import { Link as RouterLink } from "react-router-dom"

import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

export function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  return (
    <>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        Seja bem-vindo!
      </Typography>

      <FormControl component="form" fullWidth noValidate>
        <Stack gap={2} marginBottom={4}>
          <TextField name="email" label="Email" placeholder="Digite seu email" fullWidth required />

          <TextField
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>

        <Stack gap={1}>
          <Button type="submit" variant="contained" disableElevation>
            Entrar
          </Button>

          <Button disableElevation component={RouterLink} to="/auth/cadastrar">
            Criar conta
          </Button>
        </Stack>
      </FormControl>
    </>
  )
}
