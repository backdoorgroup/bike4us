import { useForm } from "react-hook-form"

import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import { TitleValidation, DescriptionValidation, HourPricingValidation, ListingForm } from "@/schemas"
import { ListingsServices } from "@/services"
import { useState } from "react"

export function AnnouncePage() {
  const form = useForm<ListingForm>()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (listing: ListingForm) => {
    try {
      /*
       *  1. Post pro backend que cria o anúncio
       *  2. Vai pra página do anúncio criado
       */

      setLoading(true)

      await ListingsServices.createListing(listing)

      // eslint-disable-next-line no-empty
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        O que você gostaria de anunciar?
      </Typography>

      <FormControl component="form" fullWidth noValidate autoComplete="off" onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap={2} marginBottom={4}>
          <TextField
            label="Título"
            placeholder="Digite o título de seu anúncio"
            error={!!form.formState.errors.title}
            helperText={form.formState.errors.title?.message}
            {...form.register("title", TitleValidation)}
          />
          <TextField
            label="Descrição"
            placeholder="Digite a descrição de seu anúncio"
            multiline
            minRows={3}
            maxRows={5}
            error={!!form.formState.errors.description}
            helperText={form.formState.errors.description?.message}
            {...form.register("description", DescriptionValidation)}
          />
          {/* TODO: restringir isso daqui a número inteiros sem sinal e positivos */}
          <TextField
            label="Preço por hora"
            placeholder="Digite o preço por hora de seu anúncio"
            error={!!form.formState.errors.hourPricing}
            helperText={form.formState.errors.hourPricing?.message}
            {...form.register("hourPricing", HourPricingValidation)}
          />
        </Stack>

        <Button type="submit" variant="contained" disabled={loading} disableElevation>
          Anunciar
        </Button>
      </FormControl>
    </Container>
  )
}
