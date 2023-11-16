/// <reference types="vite/client" />

import type { PaletteOptions as MuiPaletteOptions, Palette as MuiPalette } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface PaletteOptions extends MuiPaletteOptions {
    rating?: string
  }

  interface Palette extends MuiPalette {
    rating?: string
  }
}
