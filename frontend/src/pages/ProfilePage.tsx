import { Await, useLoaderData } from "react-router-dom"

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Icon from "@mui/material/Icon"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingCard } from "~/components"
import type { TListingsResponse, TProfile } from "~/schemas"
import { Suspense } from "react"
import Skeleton from "@mui/material/Skeleton"

export function ProfilePage() {
  const { profile, listings } = useLoaderData() as { listings: Promise<TListingsResponse>; profile: TProfile }

  return (
    <Stack divider={<Divider />}>
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Container sx={{ paddingY: "32px" }}>
          <Card variant="outlined" sx={{ margin: "0 auto", maxWidth: "fit-content" }}>
            <CardContent
              sx={{
                padding: "24px !important",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px"
              }}>
              <Box sx={{ minWidth: "96px", minHeight: "96px", maxWidth: "96px", maxHeight: "96px" }}>
                <Avatar src={profile.user?.photoURL || ""} sx={{ height: "100%", width: "100%" }}>
                  {profile.user?.displayName?.charAt(0)}
                </Avatar>
              </Box>

              <Stack spacing="16px">
                <Typography variant="h6">{profile.user?.displayName?.split(" ")?.slice(0, 2)?.join(" ")}</Typography>

                <Stack spacing="8px" sx={{ color: "text.secondary" }}>
                  <Stack spacing="8px" direction="row" sx={{ alignItems: "center" }}>
                    <Icon sx={{ fontSize: "16px !important" }}>phone</Icon>

                    <Typography sx={{ lineHeight: "1" }} variant="body2">
                      1238192314134
                    </Typography>
                  </Stack>

                  <Stack spacing="8px" direction="row" sx={{ alignItems: "center" }}>
                    <Icon sx={{ fontSize: "16px !important" }}>location_on</Icon>

                    <Typography sx={{ lineHeight: "1" }} variant="body2">
                      {profile.address?.neighborhood} - {profile.address?.city}/{profile.address?.state}
                    </Typography>
                  </Stack>

                  <Stack spacing="8px" direction="row" sx={{ alignItems: "center" }}>
                    <Icon sx={{ fontSize: "16px !important" }}>email</Icon>

                    <Typography sx={{ lineHeight: "1" }} variant="body2">
                      {profile.user?.email}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Box>
        <Container sx={{ paddingY: "24px" }}>
          <Typography variant="h6">Anúncios</Typography>

          <Stack spacing="16px">
            <Suspense
              fallback={
                <>
                  <Skeleton variant="rounded" height={120} />
                  <Skeleton variant="rounded" height={120} />
                  <Skeleton variant="rounded" height={120} />
                </>
              }>
              <Await resolve={listings}>
                {({ listings }: TListingsResponse) => (
                  <>
                    {listings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} direction="row" fullWidth />
                    ))}

                    {!listings.length && (
                      <Typography sx={{ color: "text.secondary" }}>Este usuário ainda não anunciou</Typography>
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
