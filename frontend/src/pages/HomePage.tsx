import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

import { SearchCard, SearchHeader } from "~/components"

export function HomePage() {
  return (
    <>
      <Container sx={{ bgcolor: "primary.main", color: "common.white", paddingY: 4 }}>
        <SearchHeader mb={2} />
        <SearchCard />
      </Container>
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h6" component="h4">
          Anúncios recentes
        </Typography>
      </Container>
    </>
  )
}
