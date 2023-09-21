import { useState } from "react"
import { useForm } from "react-hook-form"

import { Link as RouterLink, useNavigate } from "react-router-dom"

import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

import { AuthService } from "@/services"
import { EmailValidation, PasswordValidation } from "@/constants"

interface Form {
  email: string
  password: string
}

export function AuthRegister() {
  const navigate = useNavigate()

  const form = useForm<Form>()

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  const handleSubmit = async ({ email, password }: Form) => {
    await AuthService.createUserWithEmailAndPassword(email, password)

    navigate("/")
  }

  return (
    <>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        Cadastre-se e conheça mais da plataforma
      </Typography>

      <FormControl component="form" fullWidth noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap={2} marginBottom={4}>
          <TextField
            label="Email"
            placeholder="Digite seu email"
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message}
            {...form.register("email", EmailValidation)}
          />

          <TextField
            label="Senha"
            placeholder="Digite sua senha"
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
            error={!!form.formState.errors.password}
            helperText={form.formState.errors.password?.message}
            {...form.register("password", PasswordValidation)}
          />
        </Stack>

        <Stack gap={1}>
          <Button type="submit" variant="contained" disableElevation>
            Cadastrar
          </Button>

          <Button disableElevation component={RouterLink} to="/auth/entrar">
            Já estou cadastrado
          </Button>
        </Stack>
      </FormControl>
    </>
  )
}
