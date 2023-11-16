import "./ListingRating.scss"

import type { User } from "firebase/auth"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Icon from "@mui/material/Icon"
import LinearProgress from "@mui/material/LinearProgress"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export default function ListingRating({ user }: { user?: User | null }) {
  return (
    <>
      <Stack sx={{ gap: "16px", flexDirection: "row" }}>
        {/* Começo do componente de avaliação */}
        <Stack sx={{ gap: "8px", width: "100%" }}>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
            <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
              5
            </Typography>

            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                "width": "100%",
                "height": "8px",
                "borderRadius": "4px",
                "backgroundColor": "divider",
                "& span": { backgroundColor: "rating" }
              }}
            />
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
            <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
              4
            </Typography>

            <LinearProgress
              variant="determinate"
              value={78}
              sx={{
                "width": "100%",
                "height": "8px",
                "borderRadius": "4px",
                "backgroundColor": "divider",
                "& span": { backgroundColor: "rating" }
              }}
            />
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
            <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
              3
            </Typography>

            <LinearProgress
              variant="determinate"
              value={56}
              sx={{
                "width": "100%",
                "height": "8px",
                "borderRadius": "4px",
                "backgroundColor": "divider",
                "& span": { backgroundColor: "rating" }
              }}
            />
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
            <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
              2
            </Typography>

            <LinearProgress
              variant="determinate"
              value={42}
              sx={{
                "width": "100%",
                "height": "8px",
                "borderRadius": "4px",
                "backgroundColor": "divider",
                "& span": { backgroundColor: "rating" }
              }}
            />
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
            <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: "1" }}>
              1
            </Typography>

            <LinearProgress
              variant="determinate"
              value={18}
              sx={{
                "width": "100%",
                "height": "8px",
                "borderRadius": "4px",
                "backgroundColor": "divider",
                "& span": { backgroundColor: "rating" }
              }}
            />
          </Stack>
        </Stack>
        {/* Fim do componente de avaliação */}

        {/* Componente de média de avaliação */}
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h3" sx={{ lineHeight: 1 }}>
            4.5
          </Typography>

          <Rating readOnly defaultValue={4.5} precision={0.5} size="small" sx={{ color: "rating" }} />

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            48 avaliações
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Button
          disabled={!user}
          startIcon={<Icon>rate_review</Icon>}
          disableElevation
          fullWidth
          size="small"
          variant="outlined">
          Avalie
        </Button>

        {!user && (
          <Typography variant="caption" sx={{ color: "action.disabled", lineHeight: "2" }}>
            Você precisa estar logado para avaliar
          </Typography>
        )}
      </Box>
    </>
  )
}
