import "./ListingPage.scss"

import { useLoaderData } from "react-router-dom"

import format from "date-fns/format"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import ImageListItem from "@mui/material/ImageListItem"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

import type { TListing } from "@/services/schemas"
import { BikeType, Condition, FrameSize, Material, WheelSize } from "@/services/schemas"

export default function ListingPage() {
  const listing = useLoaderData() as TListing

  return (
    <Stack divider={<Divider />}>
      <Container sx={{ paddingY: 4 }}>
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
            {format(listing.createdAt, "HH:mm")}
          </Typography>
        </Stack>
      </Container>

      <Container sx={{ paddingY: 4 }}>
        <Stack gap={2}>
          <Typography variant="h6">Descrição</Typography>
          <Typography component="pre" sx={{ color: !listing?.description ? "text.secondary" : null }}>
            {listing?.description || "Ainda não há descrição para este anúncio"}
          </Typography>
        </Stack>
      </Container>

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
