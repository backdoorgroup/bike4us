import { RouterProvider as Router } from "react-router-dom"

import { router } from "~/router"

export function App() {
  return (
    <>
      <Router router={router} />
    </>
  )
}
