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

export function AuthLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword((showPassword) => !showPassword)
  const handleEmail: ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value)
  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => setPassword(event.target.value)
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    await AuthService.signIn.emailAndPassword(email, password)
  }

  return (
    <>
      <Typography gutterBottom variant="h5" component="h1" textAlign="center" fontWeight="500">
        Seja bem-vindo!
      </Typography>

      <FormControl onSubmit={handleSubmit} fullWidth component="form">
        <TextField
          onChange={handleEmail}
          fullWidth
          required
          label="Email"
          placeholder="Digite seu email"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          onChange={handlePassword}
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