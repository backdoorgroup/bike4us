import "./AuthLoginPage.scss"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Link, useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import GoogleIcon from "@mui/icons-material/Google"

import { EmailValidation, LoginForm, PasswordValidation } from "~/forms"
import { AuthServices } from "~/services"

export default function AuthLoginPage() {
  const navigate = useNavigate()

  const form = useForm<LoginForm>()

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword)
  }

  const handleSubmit = async ({ email, password }: LoginForm) => {
    // TODO: tratar os erros de forma amigável pro usuário que vem dessa chamada usando o AuthErrorCodes do módulo "firebase/auth"
    await AuthServices.signInWithEmailAndPassword(email, password)

    navigate("/")
  }

  const handleGoogleClick = async () => {
    await AuthServices.signInWithGooglePopup()

    navigate("/")
  }

  return (
    <Container className="auth-login-page">
      <Typography className="alp-title" variant="h5">
        Seja bem-vindo!
      </Typography>

      <FormControl
        className="alp-form"
        component="form"
        fullWidth
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack className="alpf-fields">
          <TextField
            label="Email"
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message}
            {...form.register("email", EmailValidation)}
          />

          <TextField
            label="Senha"
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

        <Stack className="alpf-actions">
          <Stack className="alpfa-top">
            <Button type="submit" variant="contained" disableElevation>
              Entrar
            </Button>

            <Button disableElevation component={Link} to="/auth/cadastrar">
              Criar conta
            </Button>
          </Stack>

          <Divider className="alpfa-divider">
            <Typography variant="caption">ou entre com</Typography>
          </Divider>

          <Button disableElevation variant="outlined" onClick={handleGoogleClick} startIcon={<GoogleIcon />}>
            Entrar com o Google
          </Button>
        </Stack>
      </FormControl>
    </Container>
  )
}
