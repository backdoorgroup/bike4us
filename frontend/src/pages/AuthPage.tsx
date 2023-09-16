import type { ChangeEventHandler, FormEventHandler } from "react"
import { useState } from "react"

import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import { AuthService } from "~/services"

export function AuthPage() {
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
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <TextField fullWidth required label="Email" placeholder="Digite seu email" onChange={handleEmail} />

        <TextField
          fullWidth
          required
          label="Senha"
          placeholder="Digite sua senha"
          type={showPassword ? "text" : "password"}
          onChange={handlePassword}
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

        <Button type="submit">Sign in</Button>
      </Box>
    </>
  )
}
