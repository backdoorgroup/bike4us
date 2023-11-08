import "./HomePage.scss"

import { useLoaderData, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingCard, SearchCard } from "~/components"
import type { SearchForm } from "~/forms"
import type { TListingsResponse } from "~/schemas"

export default function HomePage() {
  const { listings } = useLoaderData() as TListingsResponse
  const navigate = useNavigate()

  const handleSubmit = ({ query }: SearchForm) => {
    const searchParams = new URLSearchParams({ query })

    navigate(`/encontrar?${searchParams}`)
  }

  return (
    <Box className="home-page">
      <Box className="hp-wrapper hp-search">
        <Container className="hpw-container hps-container">
          <Box className="hpsc-header">
            <Typography variant="h6">Alugue uma bicicleta</Typography>

            <Typography variant="body2">Descubra o padrão ouro em aluguel de bicicletas</Typography>
          </Box>

          <SearchCard title="Encontre seu anunciado" handleSubmit={handleSubmit} />
        </Container>
      </Box>

      {!!listings.length && (
        <Box className="hp-wrapper">
          <Container className="hpw-container">
            <Typography variant="h6" gutterBottom>
              Anúncios recentes
            </Typography>

            <Stack className="hpw-carousel">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </Stack>
          </Container>
        </Box>
      )}
    </Box>
  )
}
