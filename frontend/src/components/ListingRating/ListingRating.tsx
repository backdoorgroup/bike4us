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

export default function ListingRating({
  disabled,
  dialogOpen,
  handleOpenDialog,
  handleCloseDialog,
  handleSubmitRating
}: {
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

            <ListingRatingStars value={3.4} />

            <Typography className="lrfd-total" variant="caption">
              48 avaliações
            </Typography>
          </Stack>
        </Stack>

        <Stack className="lr-actions">
          <Button onClick={handleOpenDialog} disabled={disabled} startIcon={<Icon>rate_review</Icon>} disableElevation>
            Contribua com sua avaliação
          </Button>

          {disabled && (
            <Typography variant="caption" className="lra-helper">
              Pode ser que você não esteja logado ou que você seja o dono deste anúncio
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
