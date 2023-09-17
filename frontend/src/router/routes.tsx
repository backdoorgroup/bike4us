import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { LandingLayout } from "~/layouts"
import { HomePage, AuthPage } from "~/pages"
import { AuthLogin, AuthRegister } from "~/components"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          {
            path: "*",
            index: true,
            element: <Navigate to="/auth/entrar" />
          },
          {
            path: "entrar",
            element: <AuthLogin />
          },
          {
            path: "cadastrar",
            element: <AuthRegister />
          }
        ]
      }
    ]
  }
]
