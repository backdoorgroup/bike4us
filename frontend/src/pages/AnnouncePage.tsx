import { useForm } from "react-hook-form"

import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import { TitleValidation, TypeValidation, QuadroValidation, AroValidation, TimeValidation, ConditionValidation, BrandValidation, ColorValidation, DescriptionValidation, HourPricingValidation, ListingForm } from "@/schemas"
import { ListingsServices } from "@/services"

export function AnnouncePage() {
  const form = useForm<ListingForm>()

  const handleSubmit = async (listing: ListingForm) => {
    /*
     *  1. Post pro backend que cria o anúncio
     *  2. Vai pra página do anúncio criado
     */

    await ListingsServices.createListing(listing)
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
            label="Tipo de bicicleta"
            placeholder="Ex: Mountain bike/MTB, BMX, Speed, Infantil, Passeio, Urbano, Elétrica, etc…"
            error={!!form.formState.errors.type}
            helperText={form.formState.errors.type?.message}
            {...form.register("type", TypeValidation)}
          />
          <TextField
            label="Quadro"
            placeholder="Ex: S (15” - 16”), M (16” - 18”), L (19”), XL (21”)"
            error={!!form.formState.errors.quadro}
            helperText={form.formState.errors.quadro?.message}
            {...form.register("quadro", QuadroValidation)}
          />
          <TextField
            label="Aro"
            placeholder="Ex: 12”, 16”, 20”, 24”, 26”"
            error={!!form.formState.errors.aro}
            helperText={form.formState.errors.aro?.message}
            {...form.register("aro", AroValidation)}
          />
          <TextField
            label="Tempo de uso"
            placeholder="Digite o tempo de uso de sua bicicleta"
            error={!!form.formState.errors.time}
            helperText={form.formState.errors.time?.message}
            {...form.register("time", TimeValidation)}
          />
          <TextField
            label="Condição"
            placeholder="Digite a condição de sua bicicleta"
            error={!!form.formState.errors.condition}
            helperText={form.formState.errors.condition?.message}
            {...form.register("condition", ConditionValidation)}
          />
          <TextField
            label="Marca"
            placeholder="Digite a marca de sua bicicleta"
            error={!!form.formState.errors.brand}
            helperText={form.formState.errors.brand?.message}
            {...form.register("brand", BrandValidation)}
          />
          <TextField
            label="Cor"
            placeholder="Digite a cor de sua bicicleta"
            error={!!form.formState.errors.color}
            helperText={form.formState.errors.color?.message}
            {...form.register("color", ColorValidation)}
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

        <Button type="submit" variant="contained" disableElevation>
          Anunciar
        </Button>
      </FormControl>
    </Container>
  )
}