import "./SearchPage.scss"

import { useLoaderData } from "react-router-dom"

import { TListingsResponse } from "@/schemas"

export default function SearchPage() {
  const { listings } = useLoaderData() as TListingsResponse

  return <div>{JSON.stringify(listings, null, 4)}</div>
}
