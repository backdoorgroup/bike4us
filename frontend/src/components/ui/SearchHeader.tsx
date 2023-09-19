import Box, { type BoxProps } from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export function SearchHeader(props: BoxProps) {
  return (
    <Box component="header" {...props}>
      <Typography variant="h6" component="h1">
        Alugue uma bicicleta
      </Typography>

      <Typography variant="body2" component="h2">
        Descubra o padrão ouro em aluguel de bicicletas
      </Typography>
    </Box>
  )
}
