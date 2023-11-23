import "./ProfilePhonePage.scss"

import type { User } from "firebase/auth"
import { useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"

import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
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

import { MaskableTextField } from "~/components"
import type { PhoneNumberForm, VerificationCodeForm } from "~/forms"
import { PhoneNumberValidation, VerificationCodeValidation } from "~/forms"
import { phoneMaskFactory } from "~/masks"
import { AuthServices } from "~/services"
import { useAuthStore } from "~/stores"

export default function ProfilePhonePage() {
  const { user, verificationId, setVerificationId } = useAuthStore()

  const phoneMask = useMemo(phoneMaskFactory, [])

  const [activeStep, setActiveStep] = useState(0)

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
    await AuthServices.updatePhoneNumber(user as User, verificationId as string, verificationCode)

    setVerificationId(null)
    handleNext()
  }

  useEffect(() => {
    if (!verificationId) return

    setActiveStep(1)
  }, [verificationId])

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
              <Controller
                name="phoneNumber"
                control={phoneForm.control}
                rules={PhoneNumberValidation}
                render={(state) => (
                  <MaskableTextField
                    inputRef={state.field.ref}
                    name={state.field.name}
                    disabled={state.field.disabled}
                    value={state.field.value}
                    onBlur={state.field.onBlur}
                    onAccept={(value) => state.field.onChange(value)}
                    mask={phoneMask}
                    label="Número de celular"
                    sx={{ mb: "32px" }}
                    helperText={phoneForm.formState.errors.phoneNumber?.message}
                    error={!!phoneForm.formState.errors.phoneNumber}
                    fullWidth
                  />
                )}
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
                fullWidth
                label="Código de confirmação"
                sx={{ mb: "32px" }}
                error={!!verificationForm.formState.errors.verificationCode}
                helperText={verificationForm.formState.errors.verificationCode?.message}
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
        <Box sx={{ mt: "32px" }}>
          <Alert severity="success" variant="standard">
            <AlertTitle>Sucesso, seu número de celular foi atualizado!</AlertTitle>
            <Link component={RouterLink} variant="subtitle1" to="/perfil">
              Voltar à página de perfil
            </Link>
          </Alert>
        </Box>
      )}
    </Container>
  )
}
