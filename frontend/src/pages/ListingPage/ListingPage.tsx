import "./ListingPage.scss"

import { useLoaderData } from "react-router-dom"
import clsx from "clsx"
import format from "date-fns/format"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"

import type { TListing } from "@/schemas"
import { BikeType, Condition, FrameSize, Material, WheelSize } from "@/schemas"

export default function ListingPage() {
  const listing = useLoaderData() as TListing

  return (
    <Stack className="listing-page" divider={<Divider />}>
      <Container className="lp-section">
        <Stack className="lps-container lps-hero">
          <Box className="lpsh-header">
            <Typography className="lpshh-condition" variant="caption">
              {Condition[listing.condition]}
            </Typography>

            <Typography>{listing.title}</Typography>
          </Box>

          <Box className="lpsh-image">
            <img className="lpshi-content" src={listing.picturePath} />
          </Box>

          <Box className="lpsh-information">
            <Typography className="lpshi-pricing" variant="h4">
              <Box className="lpship-currency" component="span">
                R$
              </Box>

              <Box component="span">{listing.hourPricing}</Box>
            </Typography>

            <Typography className="lpshi-caption" variant="subtitle2">
              Por hora
            </Typography>
          </Box>

          <Typography className="lpsh-date" variant="subtitle2">
            Anunciado em {format(listing.createdAt, "dd/MM")} às&nbsp;{format(listing.createdAt, "HH:mm")}
          </Typography>
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container lps-description">
          <Typography variant="h6">Descrição</Typography>

          <Typography className={clsx("lpsd-content", { disabled: !listing?.description })} component="pre">
            {listing?.description || "Ainda não há descrição para este anúncio"}
          </Typography>
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container lps-details">
          <Typography variant="h6">Detalhes</Typography>

          <TableContainer className="lpsd-table-container" variant="outlined" component={Paper}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Tipo de Bicicleta</TableCell>
                  <TableCell>{BikeType[listing.type]}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Marca</TableCell>
                  <TableCell>{listing.brand}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Quadro</TableCell>
                  <TableCell>{FrameSize[listing.frameSize]}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Aro</TableCell>
                  <TableCell>{WheelSize[listing.wheelSize]}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell>{Material[listing.material]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Stack>
  )
}