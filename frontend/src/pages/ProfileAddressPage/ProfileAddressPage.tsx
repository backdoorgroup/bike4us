import "./ProfileAddressPage.scss"

import { useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { debounce } from "@mui/material/utils"

import type { AddressForm } from "~/forms"
import { MaskableTextField } from "~/components"
import {
  CityValidation,
  ComplementValidation,
  EntirelyNumericPattern,
  NeighborhoodValidation,
  NumberValidation,
  StateValidation,
  StreetValidation,
  ZipcodeValidation
} from "~/forms"
import { zipcodeMaskFactory } from "~/masks"
import { BrasilServices, ProfileServices } from "~/services"

export default function ProfileAddressPage() {
  const form = useForm<AddressForm>()
  const navigate = useNavigate()

  const zipcodeMask = useMemo(zipcodeMaskFactory, [])

  const handleSubmit = async (address: AddressForm) => {
    await ProfileServices.createAddress(address)

    navigate("/anunciar")
  }
  const handleComplete = debounce(async (value: string) => {
    const cep = await BrasilServices.getCEP(value)

    form.setValue("street", cep.street)
    form.setValue("neighborhood", cep.neighborhood)
    form.setValue("city", cep.city)
    form.setValue("state", cep.state)
  }, 1000)

  return (
    <Container className="profile-address-page">
      <Typography className="pap-title" variant="h5">
        Opss! Parece que você ainda não tem endereço cadastrado
      </Typography>

      <FormControl
        className="pap-form"
        component="form"
        fullWidth
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack className="papf-fields">
          <Controller
            name="zipcode"
            control={form.control}
            rules={ZipcodeValidation}
            render={(state) => (
              <MaskableTextField
                unmask
                inputRef={state.field.ref}
                name={state.field.name}
                disabled={state.field.disabled}
                value={state.field.value}
                onBlur={state.field.onBlur}
                onAccept={(value) => state.field.onChange(value)}
                onComplete={(value) => handleComplete(value)}
                mask={zipcodeMask}
                label="CEP"
                helperText={form.formState.errors.zipcode?.message || "Ao preencher, outros campos serão preenchidos"}
                error={!!form.formState.errors.zipcode}
              />
            )}
          />

          <Controller
            name="street"
            control={form.control}
            rules={StreetValidation}
            render={(state) => (
              <TextField
                {...state.field}
                label="Logradouro"
                value={state.field.value || ""}
                error={!!form.formState.errors.street}
                helperText={form.formState.errors.street?.message}
              />
            )}
          />

          <Stack className="papff-same-line">
            <Controller
              name="number"
              control={form.control}
              rules={NumberValidation}
              render={(state) => (
                <TextField
                  {...state.field}
                  className="papffsl-fixed"
                  label="Número"
                  value={state.field.value || ""}
                  error={!!form.formState.errors.number}
                  helperText={form.formState.errors.number?.message}
                  onBeforeInput={(_event) => {
                    const event = _event as unknown as CompositionEvent
                    const value = event.data
                    const valid = EntirelyNumericPattern.test(value)

                    if (!valid) return event.preventDefault()

                    return valid
                  }}
                />
              )}
            />

            <Controller
              name="complement"
              control={form.control}
              rules={ComplementValidation}
              render={(state) => (
                <TextField
                  {...state.field}
                  fullWidth
                  label="Complemento"
                  value={state.field.value || ""}
                  error={!!form.formState.errors.complement}
                  helperText={form.formState.errors.complement?.message}
                />
              )}
            />
          </Stack>

          <Controller
            name="neighborhood"
            control={form.control}
            rules={NeighborhoodValidation}
            render={(state) => (
              <TextField
                {...state.field}
                label="Bairro"
                value={state.field.value || ""}
                error={!!form.formState.errors.neighborhood}
                helperText={form.formState.errors.neighborhood?.message}
              />
            )}
          />

          <Stack className="papff-same-line">
            <Controller
              name="city"
              control={form.control}
              rules={CityValidation}
              render={(state) => (
                <TextField
                  {...state.field}
                  fullWidth
                  label="Cidade"
                  value={state.field.value || ""}
                  error={!!form.formState.errors.city}
                  helperText={form.formState.errors.city?.message}
                />
              )}
            />

            <Controller
              name="state"
              control={form.control}
              rules={StateValidation}
              render={(state) => (
                <TextField
                  {...state.field}
                  className="papffsl-fixed"
                  label="Estado"
                  value={state.field.value || ""}
                  error={!!form.formState.errors.state}
                  helperText={form.formState.errors.state?.message}
                />
              )}
            />
          </Stack>
        </Stack>

        <Stack className="papf-actions">
          <Button type="submit" variant="contained" disableElevation>
            Cadastrar
          </Button>

          <Button disableElevation component={Link} to="/">
            Voltar a página inicial
          </Button>
        </Stack>
      </FormControl>
    </Container>
  )
}
