import Stack, { type StackProps } from "@mui/material/Stack"

export function ListingCarousel(props: StackProps) {
  return (
    <Stack sx={{ flexDirection: "row", overflow: "auto", gap: "16px" }} {...props}>
      {props.children}
    </Stack>
  )
}
