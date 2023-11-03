import "./ListingCard.scss"

import { Link } from "react-router-dom"

import formatDistanceToNow from "date-fns/formatDistanceToNow"
import subSeconds from "date-fns/subSeconds"

import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import { TListing } from "@/schemas"

export default function ListingCard({ listing }: { listing: TListing }) {
  return (
    <Card className="listing-card" variant="outlined">
      <CardActionArea className="lc-action" component={Link} to={`anuncios/${listing.id}`}>
        <CardMedia className="lca-image" component="img" image={listing.picturePath} />

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
