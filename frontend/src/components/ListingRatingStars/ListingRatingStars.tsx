import "./ListingRatingStars.scss"

import Rating from "@mui/material/Rating"

export default function ListingRatingStars({ value }: { value: number }) {
  return <Rating className="listing-rating-stars" size="small" value={value} precision={0.1} readOnly />
}
