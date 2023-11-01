import type { RouteObject } from "react-router-dom"
import { Navigate, redirect } from "react-router-dom"

import { redirectAuthorizedLoader, redirectUnauthorizedLoader } from "@/router/loaders"

import { HomeLayout } from "@/layouts"
import {
  AnnouncePage,
  ErrorPage,
  HomePage,
  ListingPage,
  AuthLoginPage,
  AuthRegisterPage,
  SearchPage,
  ProfilePage
} from "@/pages"
import { ListingsServices, SearchServices } from "@/services"

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

          return data
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
          } catch (_) {
            return redirect("/")
          }
        }
      },

      {
        path: "anunciar",
        element: <AnnouncePage />,
        loader: redirectUnauthorizedLoader
      },

      {
        path: "encontrar",
        element: <SearchPage />,
        loader: async ({ request: { url: _url } }) => {
          const url = new URL(_url)
          const searchParams = url.searchParams
          const query = searchParams.get("query")

          if (!query) return redirect("/")

          try {
            const data = await SearchServices.searchListings(query)

            return data
          } catch (_) {
            return redirect("/")
          }
        }
      },

      {
        path: "auth",
        loader: redirectAuthorizedLoader,
        children: [
          {
            path: "*",
            index: true,
            element: <Navigate to="entrar" replace />
          },
          {
            path: "entrar",
            element: <AuthLoginPage />
          },
          {
            path: "cadastrar",
            element: <AuthRegisterPage />
          }
        ]
      },

      {
        path: "perfil",
        element: <ProfilePage />
      },

      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]
