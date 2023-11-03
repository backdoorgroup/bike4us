import { useState } from "react"
import { useForm } from "react-hook-form"

import { Link, useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import GoogleIcon from "@mui/icons-material/Google"

import { EmailValidation, PasswordValidation, LoginForm } from "@/forms"
import { AuthServices } from "@/services"

export function AuthLogin() {
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
    <>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        Seja bem-vindo!
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

        <Stack gap={1} mb={2}>
          <Button type="submit" variant="contained" disableElevation>
            Entrar
          </Button>

          <Button disableElevation component={Link} to="/auth/cadastrar">
            Criar conta
          </Button>
        </Stack>

        <Divider sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            ou entre com
          </Typography>
        </Divider>

        <Button disableElevation variant="outlined" onClick={handleGoogleClick} startIcon={<GoogleIcon />}>
          Entrar com o Google
        </Button>
      </FormControl>
    </>
  )
}
