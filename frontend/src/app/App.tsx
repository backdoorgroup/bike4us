import { RouterProvider } from "react-router-dom"

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from "@mui/material/styles"
import teal from "@mui/material/colors/teal"

import CssBaseline from "@mui/material/CssBaseline"
import StyledEngineProvider from "@mui/material/StyledEngineProvider"
import { ptBR as muiLocale } from "@mui/material/locale"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { ptBR as muixLocale } from "@mui/x-date-pickers/locales"
import dateFnsLocale from "date-fns/locale/pt-BR"
import setDefaultOptions from "date-fns/setDefaultOptions"

import { router } from "@/router"

setDefaultOptions({
  locale: dateFnsLocale
})

const theme = extendTheme(
  {
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: teal[700]
          }
        }
      },
      dark: {
        palette: {
          primary: {
            main: teal[500]
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

export default function App() {
  return (
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
  )
}
