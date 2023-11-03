import "./HomePage.scss"

import { useLoaderData } from "react-router-dom"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import type { TListingsResponse } from "@/services/schemas"

import { ListingCard } from "@/components"

export default function HomePage() {
  const { listings } = useLoaderData() as TListingsResponse

  return (
    <Box className="home-page">
      {!!listings.length && (
        <Container className="hp-section">
          <Typography variant="h6" gutterBottom>
            Anúncios recentes
          </Typography>

          <Stack className="hps-carousel">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </Stack>
        </Container>
      )}
    </Box>
  )
}
