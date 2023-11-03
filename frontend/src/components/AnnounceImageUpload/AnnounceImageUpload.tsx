import "./AnnounceImageUpload.scss"

import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import clsx from "clsx"

import styled from "@mui/material/styles/styled"

import Icon from "@mui/material/Icon"
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
          <img className="aiub-image" src={URL.createObjectURL(picture)} />
        ) : (
          <Stack className={clsx("aiub-content", { error })}>
            <Box className="aiubc-circle">
              <Icon className="aiubcc-icon">add_photo_alternate</Icon>
            </Box>

            <Typography className="aiubc-title">Adicione uma foto</Typography>

            <Typography variant="caption">Somente JPG, JPEG, PNG ou WEBP</Typography>
          </Stack>
        )}

        <Input accept="image/png, image/jpeg, image/jpg, image/webp" type="file" {...register} />
      </ButtonBase>

      <Collapse in={!!error} unmountOnExit>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </Collapse>
    </Box>
  )
}
