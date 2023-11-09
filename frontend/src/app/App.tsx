import { RouterProvider } from "react-router-dom"

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from "@mui/material/styles"
import orange from "@mui/material/colors/orange"

import CssBaseline from "@mui/material/CssBaseline"
import StyledEngineProvider from "@mui/material/StyledEngineProvider"
import { ptBR as muiLocale } from "@mui/material/locale"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { ptBR as muixLocale } from "@mui/x-date-pickers/locales"
import dateFnsLocale from "date-fns/locale/pt-BR"
import setDefaultOptions from "date-fns/setDefaultOptions"

import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"

import { router } from "~/router"

setDefaultOptions({
  locale: dateFnsLocale
})

const theme = extendTheme(
  {
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: orange[900]
          }
        }
      }
    },
    components: {
      MuiIcon: {
        defaultProps: {
          baseClassName: "material-icons-outlined"
        }
      }
    }
  },
  muiLocale
)

const cache = createCache({
  key: "css",
  prepend: true
})

export default function App() {
  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider theme={theme}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={dateFnsLocale}
            localeText={muixLocale.components.MuiLocalizationProvider.defaultProps.localeText}>
            <CssBaseline />
            <RouterProvider router={router} />
          </LocalizationProvider>
        </CssVarsProvider>
      </StyledEngineProvider>
    </CacheProvider>
  )
}
