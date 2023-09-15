import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

import { SearchCard, SearchHeader } from "~/components"

export function HomePage() {
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
          <Typography variant="h6" component="h4">
            Anúncios recentes
          </Typography>
        </Container>
      </Box>
    </>
  )
}
