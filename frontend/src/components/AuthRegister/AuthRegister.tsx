import "./AuthRegister.scss"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Link as RouterLink, useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { EmailValidation, PasswordValidation, RegisterForm } from "@/forms"
import { AuthServices } from "@/services"

export default function AuthRegister() {
  const navigate = useNavigate()

  const form = useForm<RegisterForm>()

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  const handleSubmit = async ({ email, password }: RegisterForm) => {
    await AuthServices.createUserWithEmailAndPassword(email, password)

    navigate("/")
  }

  return (
    <Container className="auth-register">
      <Typography className="ar-title" variant="h5">
        Cadastre-se e conheça mais da plataforma
      </Typography>

      <FormControl className="ar-form" component="form" fullWidth noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack className="arf-fields">
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

        <Stack className="arf-actions">
          <Button type="submit" variant="contained" disableElevation>
            Cadastrar
          </Button>

          <Button disableElevation component={RouterLink} to="/auth/entrar">
            Já estou cadastrado
          </Button>
        </Stack>
      </FormControl>
    </Container>
  )
}
