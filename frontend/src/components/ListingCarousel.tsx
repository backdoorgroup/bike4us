import type { ReactNode } from "react"

import Stack from "@mui/material/Stack"

interface Props {
  children?: ReactNode
}

export function ListingCarousel({ children }: Props) {
  return (
    <Stack direction="row" overflow="auto" gap="16px">
      {children}
    </Stack>
  )
}
