import "./ListingCard.scss"

import { Link } from "react-router-dom"
import clsx from "clsx"

import formatDistanceToNow from "date-fns/formatDistanceToNow"
import subSeconds from "date-fns/subSeconds"

import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import type { TListing, TListingPicture } from "~/schemas"

const Directions = {
  Row: "row",
  Column: "column"
} as const
type TDirections = (typeof Directions)[keyof typeof Directions]

export default function ListingCard({
  listing,
  fullWidth = false,
  direction = Directions.Column
}: {
  listing: TListing
  fullWidth?: boolean
  direction?: TDirections
}) {
  const picture = listing.pictures.at(0) as TListingPicture

  return (
    <Card
      className={clsx("listing-card", {
        "full-width": fullWidth,
        [Directions.Row]: direction === Directions.Row,
        [Directions.Column]: direction === Directions.Column
      })}
      variant="outlined">
      <CardActionArea className={"lc-action"} component={Link} to={`/anuncios/${listing.id}`}>
        <CardMedia className="lca-image" component="img" image={picture.path} />

        <CardContent className="lca-content">
          <Typography variant="h6" gutterBottom>
            R$ {listing.hourPricing}
            <Typography variant="caption">/hora</Typography>
          </Typography>

          <Typography gutterBottom>{listing.title}</Typography>

          <Typography className="lcac-date" variant="caption" component="p">
            {formatDistanceToNow(subSeconds(listing.createdAt, listing.createdAt.getSeconds()), {
              addSuffix: true,
              includeSeconds: true
            })}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
