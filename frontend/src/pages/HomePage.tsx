import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

import { SearchCard, SearchHeader, ListingCarousel, ListingCard } from "~/components"

export function HomePage() {
  const cards = new Array(12).fill(0)

  return (
    <>
      <Box sx={{ bgcolor: "primary.main", color: "common.white", paddingY: 4 }}>
        <Container>
          <SearchHeader mb={2} />
          <SearchCard />
        </Container>
      </Box>
      <Box sx={{ paddingY: 4 }}>
        <Container>
          <Typography variant="h6" component="h4" mb={2}>
            Anúncios recentes
          </Typography>
        </Container>
        <ListingCarousel component={Container}>
          {cards.map((_, id) => (
            <ListingCard key={id} />
          ))}
        </ListingCarousel>
      </Box>
    </>
  )
}
