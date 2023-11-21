import "./ListingPage.scss"

import clsx from "clsx"
import format from "date-fns/format"
import { Suspense, useState } from "react"
import { Await, useLoaderData, useRevalidator } from "react-router-dom"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { ListingMap, ListingRating, ListingTable, ListingRatingStars } from "~/components"
import { formatZipcode } from "~/masks"
import type { TAddress, TListing, TLocations } from "~/schemas"
import type { RateListingForm } from "~/forms"
import { Condition } from "~/schemas"
import { useAuthStore } from "~/stores"
import { ListingsServices } from "~/services"

export default function ListingPage() {
  const { listing, locations } = useLoaderData() as { listing: TListing; locations: Promise<TLocations> }
  const { user } = useAuthStore()
  const { revalidate } = useRevalidator()

  const [dialogOpen, setDialogOpen] = useState(false)

  const formatAddress = (address: TAddress) =>
    `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${
      address.state
    }, ${formatZipcode(address.zipcode)}`
  const handleOpenDialog = () => {
    setDialogOpen(true)
  }
  const handleCloseDialog = () => {
    setDialogOpen(false)
  }
  const handleSubmitRating = async (rating: RateListingForm) => {
    await ListingsServices.rateListing(listing.id, rating)

    handleCloseDialog()
    revalidate()
  }

  return (
    <Stack className="listing-page" divider={<Divider />}>
      <Container className="lp-section">
        <Stack className="lps-container lps-hero">
          <Box className="lpsh-header">
            <Stack className="lpshh-headline">
              <Typography className="lpshhh-condition" variant="caption">
                {Condition[listing.condition]}
              </Typography>

              <Stack className="lpshhh-rating">
                <Typography className="lpshhhr-text" variant="caption">
                  {listing.rating?.average || 0}
                </Typography>

                <ListingRatingStars value={listing.rating?.average || 0} />

                <Typography className="lpshhhr-text" variant="caption">
                  ({listing.rating?.total || 0})
                </Typography>
              </Stack>
            </Stack>

            <Typography>{listing.title}</Typography>
          </Box>

          {/*
           * TODO: esse carousel tá meio merda fazer um melhor é bom
           * https://mui.com/material-ui/react-stepper/#text-with-carousel-effect
           */}
          <Stack className="lpsh-carousel">
            {listing.pictures.map((picture) => (
              <img className="lpshc-image" key={picture.id} src={picture.path} />
            ))}
          </Stack>

          <Box className="lpsh-information">
            <Typography className="lpshi-pricing" variant="h4">
              <Box className="lpship-currency" component="span">
                R$
              </Box>

              <Box component="span">{listing.hourPricing}</Box>
            </Typography>

            <Typography className="lpshi-caption" variant="subtitle2">
              Por hora
            </Typography>
          </Box>

          <Typography className="lpsh-date" variant="subtitle2">
            Anunciado em {format(listing.createdAt, "dd/MM")} às&nbsp;{format(listing.createdAt, "HH:mm")}
          </Typography>
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container">
          <Typography variant="h6">Avaliação</Typography>

          <ListingRating
            rating={listing.rating}
            disabled={!user || user?.uid === listing.ownerUid}
            dialogOpen={dialogOpen}
            handleCloseDialog={handleCloseDialog}
            handleOpenDialog={handleOpenDialog}
            handleSubmitRating={handleSubmitRating}
          />
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container lps-description">
          <Typography variant="h6">Descrição</Typography>

          <Typography className={clsx("lpsd-content", { disabled: !listing?.description })} component="pre">
            {listing?.description || "Não há descrição para este anúncio"}
          </Typography>
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container">
          <Typography variant="h6">Detalhes</Typography>

          <ListingTable listing={listing} />
        </Stack>
      </Container>

      <Container className="lp-section">
        <Stack className="lps-container lps-location">
          <Typography variant="h6">Localização</Typography>

          <Suspense
            fallback={
              <>
                <Skeleton variant="rounded" height="20px" width="60%" />

                <Skeleton variant="rounded" height="256px" width="100%" />

                <Skeleton variant="rounded" height="20px" width="80%" />
              </>
            }>
            <Await resolve={locations}>
              {(locations: TLocations) => (
                <>
                  <Typography variant="body2">{formatAddress(listing.address as TAddress)}</Typography>

                  <ListingMap location={locations?.at(0)} />

                  {!locations?.at(0) && (
                    <Typography className="lpsl-helper-text" variant="caption">
                      Não foi possível encontrar a localização
                    </Typography>
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </Stack>
      </Container>
    </Stack>
  )
}
