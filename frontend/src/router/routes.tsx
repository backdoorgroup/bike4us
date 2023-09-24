import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { redirectAuthorizedLoader, redirectUnauthorizedLoader } from "@/router/loaders"

import { AuthLogin, AuthRegister } from "@/components"
import { BasicLayout, HomeLayout } from "@/layouts"
import { AnnouncePage, AuthPage, ErrorPage, HomePage, ProfilePage } from "@/pages"

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
        element: <AnnouncePage />,
        loader: redirectUnauthorizedLoader
      },
      {
        path: "perfil",
        element: <ProfilePage />,
        loader: redirectUnauthorizedLoader
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
        element: <AuthPage />,
        loader: redirectAuthorizedLoader,
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
