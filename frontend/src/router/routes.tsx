import type { RouteObject } from "react-router-dom"

import { LandingLayout } from "~/layouts"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayout />
  }
]
