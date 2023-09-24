import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"

import { SearchCard, SearchHeader } from "@/components"

export function HomePage() {
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
    </>
  )
}
