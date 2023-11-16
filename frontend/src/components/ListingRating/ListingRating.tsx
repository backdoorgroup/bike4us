import "./ListingRating.scss"

import { useState } from "react"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

import Icon from "@mui/material/Icon"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingRatingBar } from "~/components"

export default function ListingRating({ disabled }: { disabled: boolean }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Stack className="listing-rating">
        <Stack className="lr-feedback">
          <Stack className="lrf-distribution">
            <ListingRatingBar text="5" rating={100} />
            <ListingRatingBar text="4" rating={80} />
            <ListingRatingBar text="3" rating={50} />
            <ListingRatingBar text="2" rating={30} />
            <ListingRatingBar text="1" rating={10} />
          </Stack>

          <Stack className="lrf-details">
            <Typography className="lrfd-title" variant="h3">
              3.4
            </Typography>

            <Rating className="lrfd-rating" size="small" value={3.4} precision={0.1} readOnly />

            <Typography className="lrfd-total" variant="caption">
              48 avaliações
            </Typography>
          </Stack>
        </Stack>

        <Stack className="lr-actions">
          <Button onClick={handleOpen} disabled={disabled} startIcon={<Icon>rate_review</Icon>} disableElevation>
            Contribua com sua avaliação
          </Button>

          {disabled && (
            <Typography variant="caption" className="lra-helper">
              Você precisa estar logado para avaliar
            </Typography>
          )}
        </Stack>
      </Stack>

      <Dialog className="listing-rating-dialog" open={open} onClose={handleClose}>
        <DialogTitle className="lrd-title">Qual a nota?</DialogTitle>

        <DialogContent className="lrd-content">
          <Rating className="lrdc-rating" size="large" />
        </DialogContent>

        <DialogActions className="lrd-actions">
          <Button disableElevation variant="contained">
            Avaliar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
