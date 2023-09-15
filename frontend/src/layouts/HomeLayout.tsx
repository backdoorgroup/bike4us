import { Outlet } from "react-router-dom"

import { NavBar, NavBottom } from "~/components"

export function LandingLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <NavBottom />
    </>
  )
}
