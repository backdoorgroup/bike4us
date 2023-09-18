import type { ChangeEventHandler, FormEventHandler } from "react"
import { useState } from "react"

import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export function AuthRegister() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: ""
  })
  const [address, setAddress] = useState({
    zipcode: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword)
  }
  const handleChangeUser: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target

    setUser((previous) => ({
      ...previous,
      [name]: value
    }))
  }
  const handleChangeAddress: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target

    setAddress((previous) => ({
      ...previous,
      [name]: value
    }))
  }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
  }

  return (
    <>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        Cadastre-se e conheça a plataforma
      </Typography>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <pre>{JSON.stringify(address, null, 2)}</pre>

      <FormControl onSubmit={handleSubmit} fullWidth component="form">
        <TextField
          onChange={handleChangeUser}
          value={user.name}
          name="name"
          fullWidth
          required
          label="Nome completo"
          placeholder="Digite seu nome completo"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          onChange={handleChangeUser}
          value={user.email}
          name="email"
          fullWidth
          required
          label="Email"
          placeholder="Digite seu email"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          onChange={handleChangeUser}
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

        <TextField
          onChange={handleChangeAddress}
          value={address.zipcode}
          name="zipcode"
          fullWidth
          required
          label="CEP"
          placeholder="Digite seu CEP"
          sx={{ marginBottom: 2 }}
        />

        <TextField
          onChange={handleChangeAddress}
          value={address.state}
          select
          name="state"
          fullWidth
          required
          label="Estado"
          placeholder="Selecione seu Estado"
          sx={{ marginBottom: 2 }}>
          <MenuItem value="AC">Acre</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" disableElevation sx={{ marginBottom: 1 }}>
          Cadastrar
        </Button>

        <Button disableElevation>Já tenho cadastro</Button>
      </FormControl>
    </>
  )
}
