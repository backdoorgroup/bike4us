import { RouterProvider } from "react-router-dom"

import CssBaseline from "@mui/material/CssBaseline"
import StyledEngineProvider from "@mui/material/StyledEngineProvider"
import teal from "@mui/material/colors/teal"
import { ptBR as muiLocale } from "@mui/material/locale"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import createTheme from "@mui/material/styles/createTheme"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { ptBR as muixLocale } from "@mui/x-date-pickers/locales"
import dateFnsLocale from "date-fns/locale/pt-BR"
import setDefaultOptions from "date-fns/setDefaultOptions"

import { router } from "@/router"

setDefaultOptions({
  locale: dateFnsLocale
})

const theme = createTheme(
  {
    palette: {
      primary: {
        main: teal[600]
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

export function App() {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={dateFnsLocale}
          localeText={muixLocale.components.MuiLocalizationProvider.defaultProps.localeText}>
          <CssBaseline />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
