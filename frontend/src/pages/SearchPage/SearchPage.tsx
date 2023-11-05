import "./SearchPage.scss"

import { useForm } from "react-hook-form"
import { Link as RouterLink, useLoaderData, useSearchParams } from "react-router-dom"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingCard, SearchCard } from "@/components"
import type { SearchForm } from "@/forms"
import { TListingsResponse } from "@/schemas"

export default function SearchPage() {
  const { listings } = useLoaderData() as TListingsResponse

  const [searchParams, setSearchParams] = useSearchParams()

  const form = useForm<SearchForm>({ defaultValues: { query: searchParams.get("query") || "" } })

  const handleSubmit = ({ query }: SearchForm) => {
    if (query === searchParams.get("query")) return

    setSearchParams({ query })
  }

  return (
    <Box className="search-page">
      <Box className="sp-wrapper sp-search">
        <Container className="spw-container">
          <SearchCard title="Deseja refinar sua busca?" form={form} handleSubmit={handleSubmit} />
        </Container>
      </Box>

      <Box className="sp-wrapper sp-results">
        <Container className="spw-container spr-container">
          <Typography variant="h6" gutterBottom>
            Resultados
          </Typography>

          {!listings.length && (
            <Box className="sprc-exception">
              <Typography className="sprce-title" gutterBottom>
                Não há resultados para esta busca.
              </Typography>

              <Link component={RouterLink} to="/">
                Ir para a página inicial
              </Link>
            </Box>
          )}

          {!!listings.length && (
            <Stack className="sprc-list">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} direction="row" fullWidth />
              ))}
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  )
}
