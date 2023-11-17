import { useLoaderData } from "react-router-dom"

import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { ListingCard } from "~/components"
import type { TListings, TProfile } from "~/schemas"

export function ProfilePage() {
  const { profile, listings } = useLoaderData() as { listings: TListings; profile: TProfile }

  return (
    <Stack divider={<Divider />}>
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Container sx={{ paddingY: "32px" }}>
          <Card variant="outlined" sx={{ margin: "0 auto", maxWidth: "fit-content" }}>
            <CardContent
              sx={{
                paddingY: "16px !important",
                paddingX: "24px     ",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px"
              }}>
              <Box sx={{ minWidth: "96px", minHeight: "96px", maxWidth: "96px", maxHeight: "96px" }}>
                <Avatar src={profile.user?.photoURL || ""} style={{ height: "100%", width: "100%" }} />
              </Box>

              <Stack>
                <Typography variant="h6">{profile.user?.displayName?.split(" ")?.slice(0, 2)?.join(" ")}</Typography>

                <Stack spacing="4px">
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    1238192314134
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {profile.address?.neighborhood} - {profile.address?.city} - {profile.address?.state}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {profile.user?.email}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Box>
        <Container sx={{ paddingY: "24px" }}>
          <Typography variant="h6">Anúncios</Typography>

          <Stack>
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} direction="row" fullWidth />
            ))}

            {!listings.length && (
              <Typography sx={{ color: "text.secondary" }}>Este usuário ainda não anunciou</Typography>
            )}
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}
