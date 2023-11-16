import "./ListingTable.scss"

import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"

import type { TListing } from "~/schemas"
import { BikeType, FrameSize, Material, WheelSize } from "~/schemas"

export default function ListingTable({ listing }: { listing: TListing }) {
  return (
    <TableContainer className="listing-table" variant="outlined" component={Paper}>
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
  )
}
