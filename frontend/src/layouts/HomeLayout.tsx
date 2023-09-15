import { Outlet } from "react-router-dom"

import { Navbar } from "~/components"

export function LandingLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}
