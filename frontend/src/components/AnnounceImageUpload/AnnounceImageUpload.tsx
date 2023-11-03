import "./AnnounceImageUpload.scss"

import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import clsx from "clsx"

import styled from "@mui/material/styles/styled"

import Icon from "@mui/material/Icon"
import ImageListItem from "@mui/material/ImageListItem"
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import FormHelperText from "@mui/material/FormHelperText"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"

// todo: converter pra scss
const Input = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
})

export default function AnnounceImageUpload({
  picture,
  error,
  register
}: {
  picture: File | null
  register: UseFormRegisterReturn
  error?: FieldError
}) {
  return (
    <Box className="announce-image-upload">
      <ButtonBase className={clsx("aiu-button", { error })} component="label">
        {picture instanceof File ? (
          <ImageListItem sx={{ width: "100%" }}>
            <img src={URL.createObjectURL(picture)} />
          </ImageListItem>
        ) : (
          <Stack alignItems="center" textAlign="center" color={error ? "error.main" : "text.primary"}>
            <Box
              sx={{
                bgcolor: "action.hover",
                borderRadius: "50%",
                fontSize: 32,
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
              <Icon fontSize="inherit">add_photo_alternate</Icon>
            </Box>
            <Box>
              <Typography fontWeight={500} component="p">
                Adicione uma foto
              </Typography>

              <Typography variant="caption" component="p">
                Somente JPG, JPEG, PNG ou WEBP
              </Typography>
            </Box>
          </Stack>
        )}

        <Input accept="image/png, image/jpeg, image/jpg, image/webp" type="file" {...register} />
      </ButtonBase>

      <Collapse in={!!error} unmountOnExit>
        <FormHelperText error>{error?.message}</FormHelperText>
      </Collapse>
    </Box>
  )
}
