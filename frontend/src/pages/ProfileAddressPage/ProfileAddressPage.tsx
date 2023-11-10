import { useLoaderData } from "react-router-dom"

import Container from "@mui/material/Container"

import { TAddress } from "~/schemas"

export default function ProfileAddressPage() {
  const address = useLoaderData() as TAddress

  return <Container>{JSON.stringify(address, null, 4)}</Container>
}
