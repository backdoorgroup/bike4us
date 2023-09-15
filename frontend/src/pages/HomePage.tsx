import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import { SearchCard, SearchHeader } from "~/components"

export function HomePage() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "common.white" }}>
      <Container sx={{ paddingY: 2 }}>
        <SearchHeader mb={2} />
        <SearchCard />
      </Container>
    </Box>
  )
}
