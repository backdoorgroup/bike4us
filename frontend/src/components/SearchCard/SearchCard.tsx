import "./SearchCard.scss"

import type { MouseEventHandler } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import type { SearchForm } from "@/forms"
import { QueryValidation } from "@/forms"

export default function SearchCard({
  title,
  searchParams,
  handleSubmit
}: {
  title: string
  searchParams?: URLSearchParams
  handleSubmit: (submitted: SearchForm) => void
}) {
  const form = useForm<SearchForm>({
    defaultValues: {
      query: searchParams?.get("query") || ""
    }
  })

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>()
  const handleOpenMenu: MouseEventHandler<HTMLElement> = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu: MouseEventHandler<HTMLElement> = () => {
    setAnchorEl(null)
  }

  return (
    <Card className="search-card" variant="outlined">
      <CardContent className="sc-content">
        <FormControl
          className="scc-form"
          component="form"
          fullWidth
          noValidate
          autoComplete="off"
          onSubmit={form.handleSubmit(handleSubmit)}>
          <Stack className="sccf-heading">
            <Typography variant="h6">{title}</Typography>

            <IconButton onClick={handleOpenMenu} color="primary" size="small">
              <Icon>tune</Icon>
            </IconButton>

            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem> */}
            </Menu>
          </Stack>

          <TextField
            className="sccf-field"
            label="Encontrar"
            placeholder="O que você procura?"
            helperText={form.formState.errors.query?.message}
            fullWidth
            {...form.register("query", QueryValidation)}
          />

          <Button fullWidth disableElevation variant="contained" type="submit" endIcon={<Icon>search</Icon>}>
            Encontrar
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  )
}
