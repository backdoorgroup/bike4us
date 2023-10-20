import { ChangeEventHandler, useState } from "react"
import { useForm } from "react-hook-form"

import styled from "@mui/material/styles/styled"

import Alert, { type AlertColor as TSeverity } from "@mui/material/Alert"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import Icon from "@mui/material/Icon"
import ImageListItem from "@mui/material/ImageListItem"
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

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
  WheelSizeValidation
} from "@/schemas/listings"
import { ListingsServices } from "@/services"

const imageSize = 128

const Condition = {
  "new": "Novo",
  "used-like-new": "Usado - Em estado de novo",
  "used-good": "Usado - Em boas condições",
  "used-fair": "Usado - Em condições razoáveis"
} as const

const BikeType = {
  mtb: "Mountain Bike (MTB)",
  bmx: "BMX",
  urban: "Bicicleta urbana",
  electric: "Bicicleta elétrica",
  cruiser: "Bicicleta de passeio"
} as const

const FrameSize = {
  s: '15" - 16" (S)',
  m: '16" - 18" (M)',
  l: '19" (L)',
  xl: '21" (XL)'
} as const

const WheelSize = {
  "12": '12"',
  "14": '14"',
  "16": '16"',
  "20": '20"',
  "22": '22"',
  "24": '24"',
  "26": '26"',
  "27": '27"',
  "27.5": '27.5"',
  "28": '28"',
  "29": '29"'
} as const

const Material = {
  "aluminum": "Alumínio",
  "carbon-fiber": "Fibra de carbono",
  "steel": "Aço",
  "titanium": "Titânio"
} as const

const HiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
})

export function AnnouncePage() {
  const form = useForm<ListingForm>()

  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ title: string; severity: TSeverity }>()

  const handleSubmit = async (listing: ListingForm) => {
    try {
      /*
       *  1. Post pro backend que cria o anúncio
       *  2. Vai pra página do anúncio criado
       */

      setLoading(true)

      await ListingsServices.createListing(listing)

      setAlert({
        title: "Seu anúncio foi criado com sucesso!",
        severity: "success"
      })
    } catch (error) {
      setAlert({
        title: "Ocorreu um erro ao criar seu anúncio",
        severity: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImages([...images, ...(e.target.files ?? [])])
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

          <Stack sx={{ overflowX: "auto", flexDirection: "row" }} gap={2}>
            <ButtonBase
              component="label"
              sx={{
                minHeight: imageSize,
                maxHeight: imageSize,
                minWidth: imageSize,
                maxWidth: imageSize,
                border: 1,
                borderRadius: 1,
                borderColor: "primary.main",
                borderStyle: "dashed",
                color: "primary.main"
              }}>
              <Box sx={{ fontSize: 32, textAlign: "center" }}>
                <Icon fontSize="inherit">add_a_photo</Icon>

                <Typography variant="subtitle2" component="p">
                  Adicionar fotos
                </Typography>

                <Typography variant="caption" component="p" fontSize="10px">
                  Somente JPG, JPEG e PNG
                </Typography>
              </Box>

              <HiddenInput type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImage} />
            </ButtonBase>

            {Object.values(images).map((image, index) => (
              <ImageListItem
                key={index}
                sx={{
                  borderRadius: 1,
                  overflow: "hidden",
                  minWidth: imageSize,
                  maxWidth: imageSize
                }}>
                <img
                  src={URL.createObjectURL(image)}
                  loading="lazy"
                  style={{
                    minWidth: imageSize,
                    maxWidth: imageSize,
                    minHeight: imageSize,
                    maxHeight: imageSize
                  }}
                />
              </ImageListItem>
            ))}
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
              placeholder="Ex: S (15” - 16”), M (16” - 18”), L (19”), XL (21”)"
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
              defaultValue=""
              label="Aro"
              placeholder="Ex: 12”, 16”, 20”, 24”, 26”"
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
