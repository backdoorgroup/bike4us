import "./SearchPage.scss"

import { useForm } from "react-hook-form"
import { Link as RouterLink, useLoaderData, useSearchParams } from "react-router-dom"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { ListingCard } from "@/components"
import type { SearchForm } from "@/forms"
import { QueryValidation } from "@/forms"
import { TListingsResponse } from "@/schemas"
import Button from "@mui/material/Button"

export default function SearchPage() {
  const { listings } = useLoaderData() as TListingsResponse

  const [searchParams, setSearchParams] = useSearchParams()

  const form = useForm<SearchForm>({ defaultValues: { query: searchParams.get("query") || "" } })

  const handleSubmit = ({ query }: SearchForm) => {
    if (query === searchParams.get("query") || !query) return

    setSearchParams({ query })
  }

  return (
    <Box className="search-page">
      <Box className="sp-wrapper sp-search">
        <Container className="spw-container sps-container">
          <Card className="spsc-card" variant="outlined">
            <CardContent className="spscc-content">
              <Typography className="spsccc-title" variant="h6">
                Deseja refinar sua busca?
              </Typography>

              <FormControl
                className="spsccc-form"
                component="form"
                fullWidth
                noValidate
                autoComplete="off"
                onSubmit={form.handleSubmit(handleSubmit)}>
                <TextField
                  fullWidth
                  className="spscccf-field"
                  label="Encontrar"
                  placeholder="O que você procura?"
                  {...form.register("query", QueryValidation)}
                />

                <Button fullWidth disableElevation variant="contained" type="submit" endIcon={<Icon>search</Icon>}>
                  Encontrar
                </Button>
              </FormControl>
            </CardContent>
          </Card>
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
