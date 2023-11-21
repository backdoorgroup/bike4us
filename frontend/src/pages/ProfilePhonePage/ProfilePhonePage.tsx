import "./ProfilePhonePage.scss"

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

const ProfilePhonePageSteps = {} as const

export default function ProfilePhonePage() {
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

      <Stepper orientation="vertical">
        <Step>
          <StepLabel>Insira seu número de telefone</StepLabel>

          <StepContent TransitionProps={{ unmountOnExit: false }} sx={{ mt: "8px" }}>
            <TextField label="Número de celular" fullWidth sx={{ mb: "32px" }} />

            <Stack sx={{ flexDirection: "row", gap: "16px", justifyContent: "flex-end" }}>
              <Button variant="contained" disableElevation size="small">
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

          <StepContent TransitionProps={{ unmountOnExit: false }}>a</StepContent>
        </Step>
      </Stepper>
    </Container>
  )
}
