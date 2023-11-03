import { Link } from "react-router-dom"

import formatDistanceToNow from "date-fns/formatDistanceToNow"
import subSeconds from "date-fns/subSeconds"

import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import { TListing } from "@/services/schemas"

export function ListingCard({ listing }: { listing: TListing }) {
  return (
    <Card variant="outlined" key={listing.id} sx={{ minWidth: 256, maxWidth: 256 }}>
      <CardActionArea component={Link} to={`anuncios/${listing.id}`}>
        <CardMedia component="img" height="160" image={listing.picturePath} />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            R$ {listing.hourPricing}
            <Typography variant="caption">/hora</Typography>
          </Typography>
          <Typography gutterBottom>{listing.title}</Typography>
          <Typography
            variant="caption"
            component="p"
            // TODO: isso aqui me motiva a não usar mais `sx`, talvez refatorar o projeto todo pra usar .scss files, o código fica extremamente feio e bagunçado
            sx={{
              ":first-letter": {
                textTransform: "capitalize"
              },
              "color": "text.secondary"
            }}>
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
