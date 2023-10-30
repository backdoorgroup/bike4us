import { useLoaderData } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"

import format from "date-fns/format"
import dateFnsLocale from "date-fns/locale/pt-BR"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import ImageListItem from "@mui/material/ImageListItem"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

import type { TListing } from "@/services/schemas"
import { BikeType, Condition, FrameSize, Material, WheelSize } from "@/services/schemas"

import type { ListingOrderForm } from "@/forms"
import { OrderFromValidation, OrderToValidation } from "@/forms"
import { ListingsServices } from "@/services"
import { useUserStore } from "@/stores"
import { useState } from "react"

export function ListingPage() {
  const [loading, setLoading] = useState(false)

  const listing = useLoaderData() as TListing
  const { user } = useUserStore()

  const form = useForm<ListingOrderForm>()
  const from = form.watch("from")

  const handleSubmit = async ({ to, from }: ListingOrderForm) => {
    try {
      setLoading(true)

      await ListingsServices.orderListing(listing.id, { to, from })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack divider={<Divider />}>
      <Container sx={{ paddingY: 4 }}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {Condition[listing.condition]}
              </Typography>

              <Typography>{listing.title}</Typography>
            </Box>

            <ImageListItem sx={{ borderRadius: 1, overflow: "hidden" }}>
              <img src={listing.picturePath} style={{ height: 288 }} />
            </ImageListItem>

            <Box>
              <Typography variant="h4">
                <Box component="span" pr={0.75}>
                  R$
                </Box>
                <Box component="span">{listing.hourPricing}</Box>
              </Typography>
              <Typography variant="subtitle2" sx={{ ml: 0.25, fontWeight: 400, color: "text.secondary" }}>
                Por hora
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ ml: 0.25, fontWeight: 400, color: "text.secondary" }}>
              Anunciado em {format(listing.createdAt, "dd/MM")} às&nbsp;
              {format(listing.createdAt, "HH:mm", { locale: dateFnsLocale })}
            </Typography>
          </Stack>

          {Boolean(user?.uid && listing.ownerUid !== user?.uid) && (
            <FormControl component="form" fullWidth noValidate onSubmit={form.handleSubmit(handleSubmit)}>
              <Stack gap={2}>
                <Stack direction="row" gap={2}>
                  <Controller
                    name="from"
                    control={form.control}
                    rules={OrderFromValidation}
                    render={({ field, fieldState }) => (
                      <DateTimePicker
                        label="Retirada"
                        disablePast
                        reduceAnimations
                        readOnly={loading}
                        minutesStep={5}
                        disabled={field.disabled}
                        onChange={(event) => field.onChange(event)}
                        slotProps={{ textField: { error: !!fieldState.error, helperText: fieldState.error?.message } }}
                        sx={{ flexGrow: 1 }}
                      />
                    )}
                  />

                  <Controller
                    name="to"
                    control={form.control}
                    rules={OrderToValidation}
                    render={({ field, fieldState }) => (
                      <DateTimePicker
                        label="Devolução"
                        disablePast
                        reduceAnimations
                        readOnly={loading}
                        minutesStep={5}
                        minDateTime={from}
                        disabled={field.disabled}
                        onChange={(event) => field.onChange(event)}
                        slotProps={{ textField: { error: !!fieldState.error, helperText: fieldState.error?.message } }}
                        sx={{ flexGrow: 1 }}
                      />
                    )}
                  />
                </Stack>

                <Button variant="contained" type="submit" disableElevation disabled={loading}>
                  Realizar um pedido
                </Button>
              </Stack>
            </FormControl>
          )}
        </Stack>
      </Container>

      {Boolean(listing?.description) && (
        <Container sx={{ paddingY: 4 }}>
          <Stack gap={2}>
            <Typography variant="h6">Descrição</Typography>
            <Typography component="pre">{listing.description}</Typography>
          </Stack>
        </Container>
      )}

      <Container sx={{ paddingY: 4 }}>
        <Stack gap={2}>
          <Typography variant="h6">Detalhes</Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
            <Table size="small">
              <TableBody>
                <TableRow sx={{ bgcolor: "action.hover" }}>
                  <TableCell variant="head">Tipo de Bicicleta</TableCell>
                  <TableCell>{BikeType[listing.type]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Marca</TableCell>
                  <TableCell>{listing.brand}</TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: "action.hover" }}>
                  <TableCell variant="head">Quadro</TableCell>
                  <TableCell>{FrameSize[listing.frameSize]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Aro</TableCell>
                  <TableCell>{WheelSize[listing.wheelSize]}</TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: "action.hover" }}>
                  <TableCell variant="head" sx={{ borderBottom: 0 }}>
                    Material
                  </TableCell>
                  <TableCell sx={{ borderBottom: 0 }}>{Material[listing.material]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Stack>
  )
}
