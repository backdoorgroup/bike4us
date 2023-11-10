import { useForm } from "react-hook-form"
import { useIMask } from "react-imask"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import type { AddressForm } from "~/forms"
import { ZipcodeValidation } from "~/forms"

export default function ProfileAddressPage() {
  const form = useForm<AddressForm>()

  const mask = useIMask({
    mask: "00000-000"
  })

  const handleSubmit = () => {
    console.log(mask.unmaskedValue)
  }

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 500, textAlign: "center", mb: 4 }}>
        Opss! Parece que você ainda não tem endereço cadastrado
      </Typography>
      <FormControl component="form" fullWidth noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack sx={{ mb: 4 }}>
          <TextField
            {...form.register("zipcode", ZipcodeValidation)}
            inputRef={mask.ref}
            label="CEP"
            placeholder="Digite seu CEP"
            error={!!form.formState.errors.zipcode}
            helperText={form.formState.errors.zipcode?.message}
          />
        </Stack>

        <Button type="submit" variant="contained" disableElevation>
          Cadastrar
        </Button>
      </FormControl>
    </Container>
  )
}
