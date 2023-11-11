import { IMaskMixin } from "react-imask"
import { useForm, Controller } from "react-hook-form"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import type { AddressForm } from "~/forms"
import { ZipcodeValidation } from "~/forms"

// TODO: Resolver o problema de tipagem
// @ts-expect-error Tá foda resolver isso
const IMaskTextField = IMaskMixin(({ inputRef, ...props }) => <TextField inputRef={inputRef} {...props} />)

export default function ProfileAddressPage() {
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
          <Controller
            name="zipcode"
            control={form.control}
            rules={ZipcodeValidation}
            render={(state) => (
              <IMaskTextField
                inputRef={state.field.ref}
                name={state.field.name}
                disabled={state.field.disabled}
                value={state.field.value}
                onBlur={state.field.onBlur}
                onAccept={(_value, maskRef) => state.field.onChange(maskRef.unmaskedValue)}
                mask="00000-000"
                label="CEP"
                placeholder="Digite seu CEP"
                // @ts-expect-error Tá foda resolver isso
                helperText={form.formState.errors.zipcode?.message}
                error={!!form.formState.errors.zipcode}
              />
            )}
          />
        </Stack>

        <Button type="submit" variant="contained" disableElevation>
          Cadastrar
        </Button>
      </FormControl>
    </Container>
  )
}
