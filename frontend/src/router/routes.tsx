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
  ProfilePhonePage,
  SearchPage
} from "~/pages"
import type { TListingsResponse } from "~/schemas"
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
          const listings = await ListingsServices.getListings({ status: "available" })

          return listings
        }
      },

      {
        path: "anuncios/:id",
        element: <ListingPage />,
        ErrorBoundary: () => <Navigate to="/" />,
        loader: async ({ params }) => {
          if (!params.id) return redirect("/")

          const listing = await ListingsServices.getListing(params.id)

          const deferredLocations = NominatimClient.compoundSearch({
            city: listing.address?.city,
            street: `${listing.address?.street}, ${listing.address?.number}`,
            state: listing.address?.state
          })
          const deferredOwner = ProfileServices.getUser(listing.ownerUid)

          return defer({
            listing,
            locations: deferredLocations,
            owner: deferredOwner
          })
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
        ErrorBoundary: () => <Navigate to="/" />,
        loader: async ({ request }) => {
          const url = new URL(request.url)
          const searchParams = url.searchParams
          const query = searchParams.get("query")

          if (!query) return redirect("/")

          const listings = await SearchServices.searchListings(query)

          return listings
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
        ErrorBoundary: () => <Navigate to="/auth" />,
        loader: async ({ params }) => {
          const profile = await ProfileServices.getProfile(params.uid)
          const uid = profile.user?.uid

          let deferredListings: Promise<TListingsResponse> = Promise.resolve({ listings: [], count: 0 })

          if (uid) {
            deferredListings = ListingsServices.getListings({ uid })
          }
          return defer({ profile, listings: deferredListings })
        }
      },

      {
        path: "perfil/endereco",
        element: <ProfileAddressPage />,
        ErrorBoundary: () => <Navigate to="/" />,
        loader: async () => {
          const profile = await ProfileServices.getProfile()

          // Isso aqui é pra travar um cara que já tem endereço de ficar criando anúncios
          // TODO: melhorar isso
          if (profile.address) return redirect("/")

          return null
        }
      },

      {
        path: "perfil/telefone",
        element: <ProfilePhonePage />,
        ErrorBoundary: () => <Navigate to="/" />,
        loader: async () => {
          const { user } = useAuthStore.getState()

          if (user?.phoneNumber) return redirect("/")

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
