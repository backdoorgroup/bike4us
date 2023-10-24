import { useState } from "react"
import { useForm } from "react-hook-form"

import styled from "@mui/material/styles/styled"

import Alert, { type AlertColor as TSeverity } from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import Icon from "@mui/material/Icon"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import FormHelperText from "@mui/material/FormHelperText"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"

import {
  TitleValidation,
  DescriptionValidation,
  HourPricingValidation,
  PictureValidation,
  ListingForm
} from "@/schemas"
import { ListingsServices } from "@/services"

const imageHeight = 192

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

  const picture = form.watch("picture")?.item(0)

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

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h5" component="h1" textAlign="center" fontWeight="500" mb={4}>
        O que você gostaria de anunciar?
      </Typography>

      <FormControl component="form" fullWidth noValidate autoComplete="off" onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap={2} marginBottom={4}>
          <Collapse in={!!alert?.title} unmountOnExit>
            <Alert severity={alert?.severity}>{alert?.title}</Alert>
          </Collapse>

          <Box>
            {picture instanceof File ? (
              <ImageListItem sx={{ borderRadius: 1, overflow: "hidden" }}>
                <img src={URL.createObjectURL(picture)} style={{ height: imageHeight }} />

                <ImageListItemBar
                  sx={{ color: "white" }}
                  position="top"
                  actionIcon={
                    <IconButton component="label" color="inherit">
                      <Icon color="inherit">add_photo_alternate</Icon>
                      <HiddenInput
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        type="file"
                        {...form.register("picture", PictureValidation)}
                      />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ) : (
              <ButtonBase
                sx={{
                  border: 1,
                  borderColor: !form.formState.errors.picture ? "action.disabled" : "error.main",
                  borderRadius: 1,
                  width: "100%",
                  height: imageHeight,
                  color: !form.formState.errors.picture ? null : "error.main",
                  flexDirection: "column",
                  gap: 1
                }}
                component="label">
                <Stack
                  sx={{
                    bgcolor: "action.hover",
                    borderRadius: "50%",
                    width: 48,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                  <Icon component="div" sx={{ fontSize: 32 }}>
                    add_photo_alternate
                  </Icon>
                </Stack>
                <Box textAlign="center">
                  <Typography fontWeight={500} lineHeight="1.0">
                    Adicione uma foto
                  </Typography>
                  <Typography variant="caption">Somente JPG, JPEG, PNG ou WEBP</Typography>
                </Box>
                <HiddenInput
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  type="file"
                  {...form.register("picture", PictureValidation)}
                />
              </ButtonBase>
            )}

            <Collapse in={!!form.formState.errors.picture} unmountOnExit>
              <FormHelperText error>{form.formState.errors.picture?.message}</FormHelperText>
            </Collapse>
          </Box>

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
