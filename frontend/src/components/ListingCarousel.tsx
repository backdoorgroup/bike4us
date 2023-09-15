import Stack from "@mui/material/Stack"

import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"

import Typography from "@mui/material/Typography"

export function ListingCarousel() {
  return (
    <Stack direction="row" overflow="auto" gap="16px">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, index) => (
        <Card key={index} sx={{ minWidth: 256, width: 256, border: 1, borderColor: "grey.300" }} elevation={0}>
          <CardActionArea>
            <CardMedia sx={{ height: 128 }} image="https://loremflickr.com/128/128/animals" />
            <CardContent>
              <Typography variant="subtitle2">Vila Pinheiro, São Paulo</Typography>
              <Typography variant="caption" component="p" color="text.secondary">
                10 horas atrás
              </Typography>
              <Typography variant="subtitle1" component="span" sx={{ fontWeight: 700 }}>
                R$300
              </Typography>
              <Typography variant="caption" component="span">
                /dia
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  )
}
