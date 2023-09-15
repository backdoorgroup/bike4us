import StyledEngineProvider from "@mui/material/StyledEngineProvider"
import CssBaseline from "@mui/material/CssBaseline"

import createTheme from "@mui/material/styles/createTheme"
import ThemeProvider from "@mui/material/styles/ThemeProvider"

import { StrictMode } from "react"
import { RouterProvider as Router } from "react-router-dom"

import { router } from "~/router"

const theme = createTheme({
  palette: {
    mode: "light"
  }
})

export function App() {
  return (
    <StrictMode>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router router={router} />
        </ThemeProvider>
      </StyledEngineProvider>
    </StrictMode>
  )
}
