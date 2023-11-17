import type { RouteObject } from "react-router-dom"
import { Navigate, defer, redirect } from "react-router-dom"

import { HomeLayout } from "~/layouts"
import {
  AnnouncePage,
  AuthLoginPage,
  AuthRegisterPage,
  ErrorPage,
  HomePage,
  ListingPage,
  ProfileAddressPage,
  ProfilePage,
  SearchPage
} from "~/pages"
import { ListingsServices, NominatimClient, ProfileServices, SearchServices } from "~/services"
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
            listing.address?.neighborhood

            const deferredLocations = NominatimClient.compoundSearch({
              city: listing.address?.city,
              street: listing.address?.street,
              state: listing.address?.state
            })

            return defer({
              listing,
              locations: deferredLocations
            })
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

          const profile = await ProfileServices.getProfile()

          if (!profile.address) return redirect("/perfil/endereco")

          return null
        }
      },

      {
        path: "encontrar",
        element: <SearchPage />,
        loader: async ({ request }) => {
          const url = new URL(request.url)
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
        path: "perfil/:uid?",
        element: <ProfilePage />,
        loader: async ({ params }) => {
          const uid = params.uid
          const profile = await ProfileServices.getProfile(uid)
          const deferredListings = uid ? ListingsServices.getListings({ uid: uid, perPage: 3 }) : null

          return defer({ profile, listings: deferredListings })
        }
      },

      {
        path: "perfil/endereco",
        element: <ProfileAddressPage />,
        loader: async () => {
          const profile = await ProfileServices.getProfile()

          // Isso aqui é pra travar um cara que já tem endereço de ficar criando anúncios
          // TODO: melhorar isso
          if (profile.address) return redirect("/")

          return null
        }
      },

      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]
