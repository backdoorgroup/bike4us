import type { ChangeEventHandler, FormEventHandler } from "react"
import { useState } from "react"

import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { AuthService } from "~/services"

export function AuthLogin() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword)
  }
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target

    setUser((previous) => ({
      ...previous,
      [name]: value
    }))
  }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    await AuthService.signIn.emailAndPassword(user.email, user.password)
  }

  return (
    <>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        Seja bem-vindo!
      </Typography>

      <FormControl onSubmit={handleSubmit} fullWidth component="form">
        <TextField
          onChange={handleChange}
          value={user.email}
          name="email"
          fullWidth
          required
          label="Email"
          placeholder="Digite seu email"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          onChange={handleChange}
          value={user.password}
          name="password"
          fullWidth
          required
          label="Senha"
          placeholder="Digite sua senha"
          type={showPassword ? "text" : "password"}
          sx={{ marginBottom: 4 }}
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

        <Button type="submit" variant="contained" disableElevation sx={{ marginBottom: 1 }}>
          Entrar
        </Button>

        <Button disableElevation>Criar conta</Button>
      </FormControl>
    </>
  )
}
