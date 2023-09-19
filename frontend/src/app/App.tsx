import StyledEngineProvider from "@mui/material/StyledEngineProvider"
import CssBaseline from "@mui/material/CssBaseline"

import createTheme from "@mui/material/styles/createTheme"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { ptBR as muiLocale } from "@mui/material/locale"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ptBR as muixLocale } from "@mui/x-date-pickers/locales"
import { default as dateFnsLocale } from "date-fns/locale/pt-BR"

import { StrictMode } from "react"
import { RouterProvider as Router } from "react-router-dom"

import { router } from "@/router"

const theme = createTheme(
  {
    palette: {
      mode: "light"
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
    <StrictMode>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={dateFnsLocale}
            localeText={muixLocale.components.MuiLocalizationProvider.defaultProps.localeText}>
            <CssBaseline />
            <Router router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StrictMode>
  )
}
