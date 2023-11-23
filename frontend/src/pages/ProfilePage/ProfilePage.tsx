import "./ProfilePage.scss"

import { Suspense } from "react"
import { Await, Link as RouterLink, useLoaderData, useRevalidator } from "react-router-dom"

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Icon from "@mui/material/Icon"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingCard } from "~/components"
import type { TListingsResponse, TProfile } from "~/schemas"
import { ListingsServices } from "~/services"
import { useAuthStore } from "~/stores"
import { formatPhoneNumber } from "~/masks"

export default function ProfilePage() {
  const { profile, listings } = useLoaderData() as { listings: Promise<TListingsResponse>; profile: TProfile }
  const { user } = useAuthStore()
  const { revalidate } = useRevalidator()

  const handleMarkAsAvailable = async (id: number) => {
    await ListingsServices.updateListing(id, { status: "available" })

    revalidate()
  }

  const handleMarkAsRented = async (id: number) => {
    await ListingsServices.updateListing(id, { status: "rented" })

    revalidate()
  }

  return (
    <Stack className="profile-page" divider={<Divider />}>
      <Box className="pp-wrapper colored">
        <Container className="ppw-container">
          <Card className="ppwc-card" variant="outlined">
            <CardContent className="ppwcc-content">
              <Avatar className="ppwccc-avatar" src={profile.user?.photoURL || ""}>
                {profile.user?.displayName?.charAt(0)}
              </Avatar>

              <Stack className="ppwccc-wrapper">
                <Typography variant="h6">{profile.user?.displayName || "Usuário sem nome"}</Typography>

                <Stack className="ppwcccw-information">
                  <Stack className="ppwcccwi-line">
                    <Icon className="ppwcccwil-icon">phone</Icon>

                    <Typography variant="body2">
                      {formatPhoneNumber(profile.user?.phoneNumber) || "Usuário sem telefone"}
                    </Typography>
                  </Stack>

                  <Stack className="ppwcccwi-line">
                    <Icon className="ppwcccwil-icon">location_on</Icon>

                    <Typography variant="body2">
                      {profile.address
                        ? `${profile.address?.neighborhood} - ${profile.address?.city}/${profile.address?.state}`
                        : "Usuário sem endereço"}
                    </Typography>
                  </Stack>

                  <Stack className="ppwcccwi-line">
                    <Icon className="ppwcccwil-icon">email</Icon>

                    <Typography variant="body2">{profile.user?.email || "Usuário sem email"}</Typography>
                  </Stack>
                </Stack>

                {!!(profile.user?.uid === user?.uid && !user?.phoneNumber) && (
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/perfil/telefone"
                    startIcon={<Icon>phone</Icon>}
                    disableElevation
                    fullWidth>
                    Atualize seu número
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Box className="pp-wrapper">
        <Container className="ppw-container">
          <Typography variant="h6" gutterBottom>
            Anúncios
          </Typography>

          <Stack className="ppwc-listings">
            <Suspense
              fallback={
                <>
                  <Skeleton variant="rounded" height={120} />

                  <Skeleton variant="rounded" height={120} />
                </>
              }>
              <Await resolve={listings}>
                {({ listings }: TListingsResponse) => (
                  <>
                    {listings.map((listing) => (
                      <ListingCard
                        fullWidth
                        direction="row"
                        key={listing.id}
                        listing={listing}
                        editable={user?.uid === profile.user?.uid}
                        handleMarkAsAvailable={() => handleMarkAsAvailable(listing.id)}
                        handleMarkAsRented={() => handleMarkAsRented(listing.id)}
                      />
                    ))}

                    {!listings.length && (
                      <Typography className="ppwcl-helper-text">Esse usuário não tem anúncios</Typography>
                    )}
                  </>
                )}
              </Await>
            </Suspense>
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}
