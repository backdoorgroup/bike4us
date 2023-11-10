import { useLoaderData } from "react-router-dom"
import { useForm } from "react-hook-form"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import type { TProfile } from "~/schemas"
import type { AddressForm } from "~/forms"
import { ZipcodeValidation } from "~/forms"

export default function ProfileAddressPage() {
  const profile = useLoaderData() as TProfile
  const form = useForm<AddressForm>()

  const handleSubmit = ({ zipcode }: AddressForm) => {
    console.log(zipcode)
  }

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 500, textAlign: "center", mb: 4 }}>
        Opss! Parece que você ainda não tem endereço cadastrado
      </Typography>
      <FormControl component="form" fullWidth noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack sx={{ mb: 4 }}>
          <TextField
            label="CEP"
            placeholder="Digite seu CEP"
            error={!!form.formState.errors.zipcode}
            helperText={form.formState.errors.zipcode?.message}
            {...form.register("zipcode", ZipcodeValidation)}
          />
        </Stack>

        <Button type="submit" variant="contained" disableElevation>
          Cadastrar
        </Button>
      </FormControl>
    </Container>
  )
}
