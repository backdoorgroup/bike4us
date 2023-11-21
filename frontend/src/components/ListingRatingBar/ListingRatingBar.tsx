import "./ListingRatingBar.scss"

import LinearProgress from "@mui/material/LinearProgress"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export default function ListingRatingBar({ text, rating }: { text: string; rating: number }) {
  return (
    <Stack className="listing-rating-bar">
      <Typography className="lrb-text" variant="caption">
        {text}
      </Typography>

      <LinearProgress className="lrb-rating" variant="determinate" value={rating} />
    </Stack>
  )
}
