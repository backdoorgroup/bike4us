import { useLoaderData } from "react-router-dom"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { TListings } from "@/services/schemas"

import { ListingCard } from "@/components"

export function HomePage() {
  const listings = useLoaderData() as TListings

  return (
    <>
      {Boolean(listings.length) && (
        <Container sx={{ paddingY: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Anúncios recentes
          </Typography>
          <Stack sx={{ flexDirection: "row", overflowX: "auto", gap: "16px" }}>
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </Stack>
        </Container>
      )}
    </>
  )
}
