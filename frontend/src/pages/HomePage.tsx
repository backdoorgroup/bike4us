import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import type { TListings, TListing } from "@/services/schemas"
import { ListingCard } from "@/components"
import { ListingsServices } from "@/services"

export function HomePage() {
  const [listings, setListings] = useState<TListings>([])

  const navigate = useNavigate()

  const handleListingClick = (listing: TListing) => {
    navigate(`/anuncios/${listing.id}`)
  }

  useEffect(() => {
    const getListings = async () => {
      const data = await ListingsServices.getListings()

      setListings(data.listings)
    }

    getListings()
  }, [])

  return (
    <>
      {Boolean(listings.length) && (
        <Container sx={{ paddingY: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Anúncios recentes
          </Typography>
          <Stack sx={{ flexDirection: "row", overflowX: "auto", gap: "16px" }}>
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onClick={() => handleListingClick(listing)} />
            ))}
          </Stack>
        </Container>
      )}
    </>
  )
}
