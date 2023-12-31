import "./SearchCard.scss"

import { useForm } from "react-hook-form"

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import FormControl from "@mui/material/FormControl"
import Icon from "@mui/material/Icon"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import type { SearchForm } from "~/forms"
import { QueryValidation } from "~/forms"

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
          </Stack>

          <TextField
            className="sccf-field"
            label="Encontrar"
            helperText={form.formState.errors.query?.message}
            fullWidth
            {...form.register("query", QueryValidation)}
          />

          <Button fullWidth disableElevation variant="contained" type="submit" startIcon={<Icon>search</Icon>}>
            Encontrar
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  )
}
