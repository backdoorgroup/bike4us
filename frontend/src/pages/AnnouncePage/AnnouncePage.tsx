import "./AnnouncePage.scss"

import type { CompositionEvent } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import Alert, { type AlertColor as TSeverity } from "@mui/material/Alert"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import { Condition, BikeType, FrameSize, WheelSize, Material } from "@/schemas"

import {
  ListingForm,
  BrandValidation,
  ConditionValidation,
  DescriptionValidation,
  FrameSizeValidation,
  HourPricingValidation,
  MaterialValidation,
  TitleValidation,
  TypeValidation,
  WheelSizeValidation,
  EntirelyNumericPattern
} from "@/forms"
import { ListingsServices } from "@/services"
import { AnnounceImageUpload } from "@/components"

export default function AnnouncePage() {
  const form = useForm<ListingForm>({ defaultValues: { pictures: [] } })

  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{
    /* TODO: trocar isso por um snackbar, tirar o alert */
    title: string
    severity: TSeverity
  }>()

  const navigate = useNavigate()

  const handleSubmit = async (listing: ListingForm) => {
    try {
      setLoading(true)

      const { id } = await ListingsServices.createListing(listing)

      navigate(`/anuncios/${id}`)
    } catch (error) {
      setAlert({
        title: "Ocorreu um erro ao criar seu anúncio",
        severity: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="announce-page">
      <Typography className="ap-title" variant="h5">
        O que você gostaria de anunciar?
      </Typography>

      <FormControl
        className="ap-form"
        component="form"
        fullWidth
        noValidate
        autoComplete="off"
        onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack className="apf-sections">
          <Collapse in={!!alert?.title} unmountOnExit>
            <Alert severity={alert?.severity}>{alert?.title}</Alert>
          </Collapse>

          <Stack className="apfs-section">
            <Box className="apfss-header">
              <Typography className="apfssh-title" variant="h6">
                Fotos
              </Typography>

              <Typography variant="caption">Você pode adicionar até 5 fotos</Typography>
            </Box>

            <AnnounceImageUpload control={form.control} />
          </Stack>

          <Stack className="apfs-section">
            <Box className="apfss-header">
              <Typography className="apfssh-title" variant="h6">
                Obrigatórios
              </Typography>

              <Typography variant="caption">Seja o mais descritivo possível</Typography>
            </Box>

            <TextField
              label="Título"
              placeholder="Digite o título de seu anúncio"
              error={!!form.formState.errors.title}
              helperText={form.formState.errors.title?.message}
              {...form.register("title", TitleValidation)}
            />

            <TextField
              label="Preço por hora"
              placeholder="Digite o preço por hora de seu anúncio"
              error={!!form.formState.errors.hourPricing}
              helperText={form.formState.errors.hourPricing?.message}
              onBeforeInput={(_event) => {
                const event = _event as unknown as CompositionEvent
                const value = event.data
                const valid = EntirelyNumericPattern.test(value)

                if (!valid) return event.preventDefault()

                return valid
              }}
              {...form.register("hourPricing", HourPricingValidation)}
            />

            <TextField
              select
              defaultValue=""
              label="Condição"
              placeholder="Digite a condição de sua bicicleta"
              error={!!form.formState.errors.condition}
              helperText={form.formState.errors.condition?.message}
              {...form.register("condition", ConditionValidation)}>
              {Object.entries(Condition).map(([value, title], index) => (
                <MenuItem value={value} key={index}>
                  {title}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack className="apfs-section">
            <Box className="apfss-header">
              <Typography className="apfssh-title" variant="h6">
                Mais detalhes
              </Typography>

              <Typography variant="caption">Coloque mais detalhes sobre sua bicicleta</Typography>
            </Box>

            <TextField
              select
              defaultValue=""
              label="Tipo de bicicleta"
              error={!!form.formState.errors.type}
              helperText={form.formState.errors.type?.message}
              {...form.register("type", TypeValidation)}>
              {Object.entries(BikeType).map(([value, title], index) => (
                <MenuItem value={value} key={index}>
                  {title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Marca"
              placeholder="Digite a marca de sua bicicleta"
              error={!!form.formState.errors.brand}
              helperText={form.formState.errors.brand?.message}
              {...form.register("brand", BrandValidation)}
            />

            <TextField
              select
              defaultValue=""
              label="Quadro"
              error={!!form.formState.errors.frameSize}
              helperText={form.formState.errors.frameSize?.message}
              {...form.register("frameSize", FrameSizeValidation)}>
              {Object.entries(FrameSize).map(([value, title], index) => (
                <MenuItem value={value} key={index}>
                  {title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              SelectProps={{
                MenuProps: {
                  slotProps: {
                    paper: {
                      sx: {
                        maxHeight: 208
                      }
                    }
                  }
                }
              }}
              defaultValue=""
              label="Aro"
              error={!!form.formState.errors.wheelSize}
              helperText={form.formState.errors.wheelSize?.message}
              {...form.register("wheelSize", WheelSizeValidation)}>
              {Object.entries(WheelSize).map(([value, title], index) => (
                <MenuItem value={value} key={index}>
                  {title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              defaultValue=""
              label="Material"
              error={!!form.formState.errors.material}
              helperText={form.formState.errors.material?.message}
              {...form.register("material", MaterialValidation)}>
              {Object.entries(Material).map(([value, title], index) => (
                <MenuItem value={value} key={index}>
                  {title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              multiline
              label="Descrição"
              placeholder="Digite a descrição de seu anúncio"
              minRows={3}
              maxRows={5}
              error={!!form.formState.errors.description}
              helperText={form.formState.errors.description?.message}
              {...form.register("description", DescriptionValidation)}
            />
          </Stack>
        </Stack>

        <Button type="submit" variant="contained" disabled={loading} disableElevation>
          Anunciar
        </Button>
      </FormControl>
    </Container>
  )
}
