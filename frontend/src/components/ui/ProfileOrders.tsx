import { useLoaderData } from "react-router-dom"

import Typography from "@mui/material/Typography"

import type { TOrders } from "@/services/schemas"

export function ProfileOrders() {
  const orders = useLoaderData() as TOrders

  return (
    <>
      <Typography variant="h6" component="h3">
        Pedidos recebidos
      </Typography>
      <pre>{JSON.stringify(orders, null, 4)}</pre>
    </>
  )
}
