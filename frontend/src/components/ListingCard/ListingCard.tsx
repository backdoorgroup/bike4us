import "./ListingCard.scss"

import clsx from "clsx"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import formatDistanceToNow from "date-fns/formatDistanceToNow"
import subSeconds from "date-fns/subSeconds"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Icon from "@mui/material/Icon"
import IconButton, { type IconButtonProps } from "@mui/material/IconButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"

import type { TListingPicture, TListing } from "~/schemas"
import { Status } from "~/schemas"

const Directions = {
  Row: "row",
  Column: "column"
} as const
type TDirections = (typeof Directions)[keyof typeof Directions]

export default function ListingCard({
  listing,
  editable = false,
  fullWidth = false,
  direction = Directions.Column,
  handleMarkAsAvailable,
  handleMarkAsRented
}: {
  listing: TListing
  editable?: boolean
  fullWidth?: boolean
  direction?: TDirections
  handleMarkAsAvailable?: () => void
  handleMarkAsRented?: () => void
}) {
  const picture = useMemo(() => listing.pictures.at(0), [listing.pictures]) as TListingPicture

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen: IconButtonProps["onClick"] = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Card
        className={clsx("listing-card", {
          "full-width": fullWidth,
          [Directions.Row]: direction === Directions.Row
        })}
        variant="outlined">
        <CardActionArea
          className="lc-action"
          disabled={listing.status !== "available"}
          disableRipple
          component={Link}
          to={`/anuncios/${listing.id}`}>
          <CardMedia className="lca-image" component="img" image={picture.path} />

          <CardContent className="lca-content">
            <Typography variant="h6" gutterBottom>
              R$ {listing.hourPricing}
              <Typography variant="caption">/hora</Typography>
            </Typography>

            <Typography gutterBottom>{listing.title}</Typography>

            <Box className="lcac-information">
              <Typography className="lcaci-text" variant="caption" component="p">
                {formatDistanceToNow(subSeconds(listing.createdAt, listing.createdAt.getSeconds()), {
                  addSuffix: true,
                  includeSeconds: true
                })}
              </Typography>

              {editable && (
                <Typography className="lcaci-text" variant="caption" component="p">
                  {Status[listing.status]}
                </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>

        {editable && (
          <CardActions className="lc-editable">
            <IconButton onClick={handleOpen}>
              <Icon>more_vert</Icon>
            </IconButton>
          </CardActions>
        )}
      </Card>

      {editable && (
        <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
          {listing.status === "available" && (
            <MenuItem
              onClick={() => {
                handleMarkAsRented && handleMarkAsRented()
                handleClose()
              }}>
              <ListItemIcon>
                <Icon>done</Icon>
              </ListItemIcon>

              <ListItemText>Marcar como alugado</ListItemText>
            </MenuItem>
          )}

          {listing.status === "rented" && (
            <MenuItem
              onClick={() => {
                handleMarkAsAvailable && handleMarkAsAvailable()
                handleClose()
              }}>
              <ListItemIcon>
                <Icon>play_circle</Icon>
              </ListItemIcon>

              <ListItemText>Marcar como disponível</ListItemText>
            </MenuItem>
          )}
        </Menu>
      )}
    </>
  )
}
