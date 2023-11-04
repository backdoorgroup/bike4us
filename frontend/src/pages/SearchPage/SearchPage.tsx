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
    setSearchParams({ query })
  }

  return (
    <Box>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container sx={{ paddingY: "32px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                Deseja refinar sua busca?
              </Typography>

              <FormControl
                className="hpscc-form"
                component="form"
                fullWidth
                noValidate
                autoComplete="off"
                onSubmit={form.handleSubmit(handleSubmit)}>
                <TextField
                  fullWidth
                  label="Encontrar"
                  placeholder="O que você procura?"
                  sx={{ marginBottom: "32px" }}
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

      <Box>
        <Container sx={{ paddingY: "32px" }}>
          <Typography variant="h6" gutterBottom>
            Resultados
          </Typography>

          <Stack>
            {!listings.length && (
              <>
                <Typography sx={{ color: "text.secondary" }} gutterBottom>
                  Não há resultados para esta busca.
                </Typography>
                <Link component={RouterLink} to="/" sx={{ color: "info.secondary" }}>
                  Ir para a página inicial
                </Link>
              </>
            )}

            {!!listings.length && listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
