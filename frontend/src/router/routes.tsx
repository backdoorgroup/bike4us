import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { AuthLogin, AuthRegister } from "@/components"
import { HomeLayout, BasicLayout } from "@/layouts"
import { AnnouncePage, AuthPage, ErrorPage, HomePage } from "@/pages"

import { useUserStore } from "@/stores"

const { user } = useUserStore.getState()

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
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
  },
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "auth",
        element: !user?.uid ? <AuthPage /> : <Navigate to="/" replace />,
        children: [
          {
            path: "*",
            index: true,
            element: <Navigate to="entrar" replace />
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
