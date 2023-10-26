import type { RouteObject } from "react-router-dom"
import { Navigate, redirect } from "react-router-dom"

import { redirectAuthorizedLoader, redirectUnauthorizedLoader } from "@/router/loaders"

import { AuthLogin, AuthRegister } from "@/components"
import { HomeLayout } from "@/layouts"
import { AnnouncePage, AuthPage, ErrorPage, HomePage, ListingPage } from "@/pages"
import { ListingsServices } from "@/services"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          const data = await ListingsServices.getListings()

          return data.listings
        }
      },

      {
        path: "anuncios/:id",
        element: <ListingPage />,
        loader: async ({ params }) => {
          if (!params.id) return redirect("/")

          try {
            const data = await ListingsServices.getListing(params.id)

            return data
          } catch (error) {
            return redirect("/")
          }

          return null
        }
      },

      {
        path: "anunciar",
        element: <AnnouncePage />,
        loader: redirectUnauthorizedLoader
      },

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
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]
