import "./ProfilePhonePage.scss"

import type { User } from "firebase/auth"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Step from "@mui/material/Step"
import StepContent from "@mui/material/StepContent"
import StepLabel from "@mui/material/StepLabel"
import Stepper from "@mui/material/Stepper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import type { PhoneNumberForm, VerificationCodeForm } from "~/forms"
import { PhoneNumberValidation, VerificationCodeValidation } from "~/forms"
import { AuthServices } from "~/services"
import { useAuthStore } from "~/stores"

export default function ProfilePhonePage() {
  const { user } = useAuthStore()

  const [activeStep, setActiveStep] = useState(0)

  // Isso deveria ter persistência
  const [verificationId, setVerificationId] = useState("")

  const phoneForm = useForm<PhoneNumberForm>()
  const verificationForm = useForm<VerificationCodeForm>()

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }
  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleVerifyPhoneNumber = async ({ phoneNumber }: PhoneNumberForm) => {
    const verificationId = await AuthServices.verifyPhoneNumber(phoneNumber)

    setVerificationId(verificationId)
    handleNext()
  }

  const handleUpdatePhoneNumber = async ({ verificationCode }: VerificationCodeForm) => {
    await AuthServices.updatePhoneNumber(user as User, verificationId, verificationCode)

    handleNext()
  }

  return (
    <Container className="profile-phone-page">
      <Box className="ppp-introduction">
        <Typography className="pppi-title" variant="h5" gutterBottom>
          Opss! Parece que você ainda não tem seu número de celular cadastrado
        </Typography>

        <Typography className="pppi-caption" variant="caption" component="p">
          Você pode aumentar suas chances de ser contratado em até 5x ao colocar seu número de celular
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Insira seu número de telefone</StepLabel>

          <StepContent TransitionProps={{ unmountOnExit: false }}>
            <FormControl
              component="form"
              fullWidth
              noValidate
              onSubmit={phoneForm.handleSubmit(handleVerifyPhoneNumber)}>
              <TextField
                label="Número de celular"
                fullWidth
                sx={{ mb: "32px" }}
                {...phoneForm.register("phoneNumber", PhoneNumberValidation)}
              />

              <Stack sx={{ flexDirection: "row", gap: "16px", justifyContent: "flex-end" }}>
                <Button disableElevation variant="contained" size="small" type="submit">
                  Próximo
                </Button>

                <Button disabled sx={{ mr: 1 }}>
                  Voltar
                </Button>
              </Stack>
            </FormControl>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Verifique seu número de telefone</StepLabel>

          <StepContent TransitionProps={{ unmountOnExit: false }}>
            <FormControl
              component="form"
              fullWidth
              noValidate
              onSubmit={verificationForm.handleSubmit(handleUpdatePhoneNumber)}>
              <TextField
                label="Código de confirmação"
                fullWidth
                sx={{ mb: "32px" }}
                {...verificationForm.register("verificationCode", VerificationCodeValidation)}
              />

              <Stack sx={{ flexDirection: "row", gap: "16px", justifyContent: "flex-end" }}>
                <Button disableElevation variant="contained" size="small" type="submit">
                  Confirmar
                </Button>

                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Voltar
                </Button>
              </Stack>
            </FormControl>
          </StepContent>
        </Step>
      </Stepper>

      {activeStep === 2 && (
        <Box>
          <Typography gutterBottom sx={{ mt: 2 }}>
            Seu número de telefone foi verificado com sucesso.
          </Typography>

          <Link component={RouterLink} variant="subtitle1" to="/perfil">
            Voltar à página de perfil
          </Link>
        </Box>
      )}
    </Container>
  )
}
