import type { RouteObject } from "react-router-dom"
import { Navigate, redirect } from "react-router-dom"

import { HomeLayout } from "~/layouts"
import {
  AnnouncePage,
  AuthLoginPage,
  AuthRegisterPage,
  ErrorPage,
  HomePage,
  ListingPage,
  ProfileAddressPage,
  SearchPage
} from "~/pages"
import { ListingsServices, ProfileServices, SearchServices } from "~/services"
import { useAuthStore } from "~/stores"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          const listings = await ListingsServices.getListings()

          return listings
        }
      },

      {
        path: "anuncios/:id",
        element: <ListingPage />,
        loader: async ({ params }) => {
          if (!params.id) return redirect("/")

          try {
            const listing = await ListingsServices.getListing(params.id)

            return listing
          } catch (_) {
            return redirect("/")
          }
        }
      },

      {
        path: "anunciar",
        element: <AnnouncePage />,
        loader: async () => {
          const { user } = useAuthStore.getState()

          if (!user?.uid) return redirect("/auth")

          const address = await ProfileServices.getAddress()

          if (!address) return redirect("/perfil/endereco")

          return null
        }
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
            const listings = await SearchServices.searchListings(query)

            return listings
          } catch (_) {
            return redirect("/")
          }
        }
      },

      {
        path: "auth",
        loader: () => {
          const { user } = useAuthStore.getState()

          if (user?.uid) return redirect("/")

          return null
        },
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
        loader: async () => {
          const { user } = useAuthStore.getState()

          if (!user?.uid) return redirect("/auth")

          return null
        },
        children: [
          {
            path: "endereco",
            element: <ProfileAddressPage />,
            loader: async () => {
              const address = await ProfileServices.getAddress()

              // Isso aqui é pra travar um cara que já tem endereço de ficar criando anúncios
              // TODO: melhorar isso
              if (address) return redirect("/")

              return address
            }
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
