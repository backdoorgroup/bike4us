import "./ListingRating.scss"

import Button from "@mui/material/Button"
import Icon from "@mui/material/Icon"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingRatingBar } from "~/components"

export default function ListingRating({ disabled }: { disabled: boolean }) {
  return (
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
            4.5
          </Typography>

          <Rating className="lrfd-rating" size="small" defaultValue={4.5} precision={0.5} readOnly />

          <Typography className="lrfd-total" variant="caption">
            48 avaliações
          </Typography>
        </Stack>
      </Stack>

      <Stack className="lr-actions">
        <Button disabled={disabled} startIcon={<Icon>rate_review</Icon>} disableElevation>
          Contribua com sua avaliação
        </Button>

        {disabled && (
          <Typography variant="caption" className="lra-helper">
            Você precisa estar logado para avaliar
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
