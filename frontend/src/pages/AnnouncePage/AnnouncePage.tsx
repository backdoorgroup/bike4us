import "./AnnouncePage.scss"

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

import { Condition, BikeType, FrameSize, WheelSize, Material } from "@/services/schemas"

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
  PictureValidation,
  WheelSizeValidation
} from "@/forms"
import { ListingsServices } from "@/services"
import { AnnounceImageUpload } from "@/components"

export default function AnnouncePage() {
  const form = useForm<ListingForm>()

  const picture = form.watch("picture")?.item(0)

  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ title: string; severity: TSeverity }>()

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
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        O que você gostaria de anunciar?
      </Typography>

      <FormControl component="form" fullWidth noValidate autoComplete="off" onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap={4} marginBottom={4}>
          <Collapse in={!!alert?.title} unmountOnExit>
            <Alert severity={alert?.severity}>{alert?.title}</Alert>
          </Collapse>

          <Stack gap={2}>
            <Box textAlign="center">
              <Typography variant="h6" lineHeight="1">
                Foto
              </Typography>
              <Typography variant="caption">Esta será a capa de seu anúncio</Typography>
            </Box>

            <AnnounceImageUpload
              picture={picture}
              error={form.formState.errors.picture}
              register={form.register("picture", PictureValidation)}
            />
          </Stack>

          <Stack gap={2}>
            <Box textAlign="center">
              <Typography variant="h6" lineHeight="1">
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
            {/* TODO: restringir isso daqui a número inteiros sem sinal e positivos */}
            <TextField
              label="Preço por hora"
              placeholder="Digite o preço por hora de seu anúncio"
              error={!!form.formState.errors.hourPricing}
              helperText={form.formState.errors.hourPricing?.message}
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

          <Stack gap={2}>
            <Box textAlign="center">
              <Typography variant="h6" lineHeight="1">
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
              label="Descrição"
              placeholder="Digite a descrição de seu anúncio"
              multiline
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
