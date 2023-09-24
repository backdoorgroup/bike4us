import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { AuthLogin, AuthRegister } from "@/components"
import { LandingLayout } from "@/layouts"
import { AnnouncePage, AuthPage, ErrorPage, HomePage } from "@/pages"

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
      },
      {
        path: "anunciar",
        element: user?.uid ? <AnnouncePage /> : <Navigate to="/auth" replace />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]
