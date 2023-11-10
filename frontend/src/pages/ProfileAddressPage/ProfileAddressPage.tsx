import { useLoaderData } from "react-router-dom"

import Container from "@mui/material/Container"

import type { TProfile } from "~/schemas"

export default function ProfileAddressPage() {
  const profile = useLoaderData() as TProfile

  return <Container>{JSON.stringify(profile, null, 4)}</Container>
}
