import { IMaskMixin } from "react-imask"
import { useForm, Controller } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import { debounce } from "@mui/material/utils"

import type { AddressForm } from "~/forms"
import {
  ZipcodeValidation,
  StreetValidation,
  NumberValidation,
  EntirelyNumericPattern,
  ComplementValidation,
  CityValidation,
  StateValidation,
  NeighborhoodValidation
} from "~/forms"
import { BrasilServices, ProfileServices } from "~/services"

// TODO: Resolver o problema de tipagem
// @ts-expect-error Tá foda resolver isso
const IMaskTextField = IMaskMixin(({ inputRef, ...props }) => <TextField inputRef={inputRef} {...props} />)

export default function ProfileAddressPage() {
  const form = useForm<AddressForm>()
  const navigate = useNavigate()

  const handleSubmit = async (address: AddressForm) => {
    await ProfileServices.createAddress(address)

    navigate("/perfil")
  }
  const handleComplete = debounce(async (value: string) => {
    const cep = await BrasilServices.getCEP(value)

    form.setValue("street", cep.street)
    form.setValue("neighborhood", cep.neighborhood)
    form.setValue("city", cep.city)
    form.setValue("state", cep.state)
  }, 1000)

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 500, textAlign: "center", mb: 4 }}>
        Opss! Parece que você ainda não tem endereço cadastrado
      </Typography>

      <FormControl component="form" fullWidth noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack sx={{ mb: 4, gap: 2 }}>
          <Controller
            name="zipcode"
            control={form.control}
            rules={ZipcodeValidation}
            render={(state) => (
              <IMaskTextField
                unmask
                inputRef={state.field.ref}
                name={state.field.name}
                disabled={state.field.disabled}
                value={state.field.value}
                onBlur={state.field.onBlur}
                onAccept={(value) => state.field.onChange(value)}
                onComplete={(value) => handleComplete(value)}
                mask="00000-000"
                label="CEP"
                // @ts-expect-error Tá foda resolver isso
                helperText={form.formState.errors.zipcode?.message || "Ao preencher, outros campos serão preenchidos"}
                error={!!form.formState.errors.zipcode}
              />
            )}
          />

          <TextField
            label="Logradouro"
            InputLabelProps={{ shrink: !!form.watch("street") }}
            error={!!form.formState.errors.street}
            helperText={form.formState.errors.street?.message}
            {...form.register("street", StreetValidation)}
          />

          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <TextField
              sx={{ width: 180 }}
              label="Número"
              error={!!form.formState.errors.number}
              helperText={form.formState.errors.number?.message}
              onBeforeInput={(_event) => {
                const event = _event as unknown as CompositionEvent
                const value = event.data
                const valid = EntirelyNumericPattern.test(value)

                if (!valid) return event.preventDefault()

                return valid
              }}
              {...form.register("number", NumberValidation)}
            />

            <TextField
              sx={{ flexGrow: 1 }}
              label="Complemento"
              error={!!form.formState.errors.complement}
              helperText={form.formState.errors.complement?.message}
              {...form.register("complement", ComplementValidation)}
            />
          </Stack>

          <TextField
            label="Bairro"
            InputLabelProps={{ shrink: !!form.watch("neighborhood") }}
            error={!!form.formState.errors.neighborhood}
            helperText={form.formState.errors.neighborhood?.message}
            {...form.register("neighborhood", NeighborhoodValidation)}
          />

          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <TextField
              sx={{ flexGrow: 1 }}
              label="Cidade"
              InputLabelProps={{ shrink: !!form.watch("city") }}
              error={!!form.formState.errors.city}
              helperText={form.formState.errors.city?.message}
              {...form.register("city", CityValidation)}
            />

            <TextField
              sx={{ width: 160 }}
              label="Estado"
              InputLabelProps={{ shrink: !!form.watch("state") }}
              error={!!form.formState.errors.state}
              helperText={form.formState.errors.state?.message}
              {...form.register("state", StateValidation)}
            />
          </Stack>
        </Stack>

        <Stack sx={{ gap: 1 }}>
          <Button type="submit" variant="contained" disableElevation>
            Salvar
          </Button>

          <Button disableElevation component={Link} to="/">
            Voltar a página inicial
          </Button>
        </Stack>
      </FormControl>
    </Container>
  )
}
