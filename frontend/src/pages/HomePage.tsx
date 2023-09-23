import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

import { SearchCard, SearchHeader } from "@/components"

export function HomePage() {
  return (
    <>
      <Box sx={{ bgcolor: "primary.main", color: "common.white", paddingY: 2 }}>
        <Container>
          <SearchHeader mb={2} />
          <SearchCard />
        </Container>
      </Box>
    </>
  )
}
