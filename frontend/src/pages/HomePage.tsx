import { useLoaderData } from "react-router-dom"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import subSeconds from "date-fns/subSeconds"
import dateFnsLocale from "date-fns/locale/pt-BR"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

import { SearchCard, SearchHeader } from "@/components"

export function HomePage() {
  const listings: unknown = useLoaderData()

  return (
    <>
      <Box sx={{ bgcolor: "primary.main", color: "common.white", paddingY: 2 }}>
        <Container>
          <Stack gap={2}>
            <SearchHeader />
            <SearchCard />
          </Stack>
        </Container>
      </Box>
      <Container sx={{ paddingY: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Anúncios recentes
        </Typography>
        <Stack sx={{ flexDirection: "row", overflowX: "scroll", gap: "16px" }}>
          {listings.map((listing) => (
            <Card variant="outlined" key={listing.id} sx={{ minWidth: 130, maxWidth: 130 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  R$ {listing.hourPricing}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {listing.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    ":first-letter": {
                      textTransform: "capitalize"
                    }
                  }}>
                  {formatDistanceToNow(
                    subSeconds(new Date(listing.createdAt), new Date(listing.createdAt).getSeconds()),
                    {
                      locale: dateFnsLocale,
                      addSuffix: true,
                      includeSeconds: true
                    }
                  )}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </>
  )
}
