import "./ProfilePhonePage.scss"

import { useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Step from "@mui/material/Step"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import StepContent from "@mui/material/StepContent"
import StepLabel from "@mui/material/StepLabel"
import Stepper from "@mui/material/Stepper"
import Typography from "@mui/material/Typography"

// import { AuthServices } from "~/services"

export default function ProfilePhonePage() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
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

          <StepContent TransitionProps={{ unmountOnExit: false }} sx={{ mt: "8px" }}>
            <TextField label="Número de celular" fullWidth sx={{ mb: "32px" }} />

            <Stack sx={{ flexDirection: "row", gap: "16px", justifyContent: "flex-end" }}>
              <Button disableElevation variant="contained" size="small" onClick={handleNext}>
                Próximo
              </Button>

              <Button disabled sx={{ mr: 1 }}>
                Voltar
              </Button>
            </Stack>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Verifique seu número de telefone</StepLabel>

          <StepContent TransitionProps={{ unmountOnExit: false }} sx={{ mt: "8px" }}>
            <TextField label="Código de confirmação" fullWidth sx={{ mb: "32px" }} />

            <Stack sx={{ flexDirection: "row", gap: "16px", justifyContent: "flex-end" }}>
              <Button variant="contained" disableElevation size="small">
                Confirmar
              </Button>

              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Voltar
              </Button>
            </Stack>
          </StepContent>
        </Step>
      </Stepper>
    </Container>
  )
}
