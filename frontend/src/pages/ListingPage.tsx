import { useParams } from "react-router-dom"

import Container from "@mui/material/Container"

import { ListingsServices } from "@/services"
import { useEffect, useState } from "react"
import { TListing } from "@/services/schemas"

export function ListingPage() {
  const [listing, setListing] = useState<TListing>()

  const params = useParams()

  useEffect(() => {
    const getListing = async () => {
      if (!params.id) return

      const data = await ListingsServices.getListing(params.id)

      setListing(data)
    }

    getListing()
  }, [params.id])
  // TODO: deixar bonitinho

  return (
    <Container sx={{ paddingY: 4 }}>
      <pre>{JSON.stringify(listing, undefined, 4)}</pre>
    </Container>
  )
}
