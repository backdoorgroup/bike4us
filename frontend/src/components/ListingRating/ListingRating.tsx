import "./ListingRating.scss"

import { Controller, useForm } from "react-hook-form"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Collapse from "@mui/material/Collapse"

import Icon from "@mui/material/Icon"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingRatingBar, ListingRatingStars } from "~/components"
import { RatingValidation, type RateListingForm } from "~/forms"
import type { TOverallRating } from "~/schemas"

export default function ListingRating({
  rating,
  disabled,
  dialogOpen,
  handleOpenDialog,
  handleCloseDialog,
  handleSubmitRating
}: {
  rating?: TOverallRating
  disabled: boolean
  dialogOpen: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  handleSubmitRating: (rating: RateListingForm) => void
}) {
  const form = useForm<RateListingForm>()

  return (
    <>
      <Stack className="listing-rating">
        <Stack className="lr-feedback">
          <Stack className="lrf-distribution">
            <ListingRatingBar text="5" rating={rating?.distribution[5] || 0} />
            <ListingRatingBar text="4" rating={rating?.distribution[4] || 0} />
            <ListingRatingBar text="3" rating={rating?.distribution[3] || 0} />
            <ListingRatingBar text="2" rating={rating?.distribution[2] || 0} />
            <ListingRatingBar text="1" rating={rating?.distribution[1] || 0} />
          </Stack>

          <Stack className="lrf-details">
            <Typography className="lrfd-title" variant="h3">
              {rating?.average || 0}
            </Typography>

            <ListingRatingStars value={rating?.average || 0} />

            <Typography className="lrfd-total" variant="caption">
              {rating?.total || 0} avaliações
            </Typography>
          </Stack>
        </Stack>

        <Stack className="lr-actions">
          <Button
            startIcon={<Icon>rate_review</Icon>}
            disabled={disabled}
            onClick={handleOpenDialog}
            variant="contained"
            disableElevation>
            Avaliar
          </Button>

          {disabled && (
            <Typography variant="caption" className="lra-helper">
              Você não pode avaliar este anúncio
            </Typography>
          )}
        </Stack>
      </Stack>

      <Dialog className="listing-rating-dialog" open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle className="lrd-title">Qual a nota?</DialogTitle>

        <FormControl
          className="lrd-form"
          component="form"
          fullWidth
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(handleSubmitRating)}>
          <DialogContent className="lrdf-content">
            <Controller
              name="value"
              control={form.control}
              rules={RatingValidation}
              render={(state) => (
                <Rating
                  className="lrdfc-rating"
                  size="large"
                  name={state.field.name}
                  onBlur={state.field.onBlur}
                  ref={state.field.ref}
                  disabled={state.field.disabled}
                  value={state.field.value || 0}
                  onChange={(_event, value) => state.field.onChange(value)}
                />
              )}
            />

            <Collapse in={!!form.formState.errors.value} unmountOnExit>
              <FormHelperText>{form.formState.errors.value?.message}</FormHelperText>
            </Collapse>
          </DialogContent>

          <DialogActions className="lrd-actions">
            <Button disableElevation variant="contained" type="submit">
              Avaliar
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  )
}
