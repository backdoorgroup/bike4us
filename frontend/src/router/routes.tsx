import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { LandingLayout } from "@/layouts"
import { HomePage, AuthPage, ErrorPage } from "@/pages"
import { AuthLogin, AuthRegister } from "@/components"

import { useUserStore } from "@/stores"

const { user } = useUserStore.getState()

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
        path: "*",
        element: <ErrorPage />
      },
      {
        path: "auth",
        element: !user?.uid ? <AuthPage /> : <Navigate to="/" replace />,
        children: [
          {
            path: "*",
            index: true,
            element: <Navigate to="/auth/entrar" replace />
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
