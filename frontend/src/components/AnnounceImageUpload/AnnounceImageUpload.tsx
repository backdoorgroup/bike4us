import "./AnnounceImageUpload.scss"

import type { Control } from "react-hook-form"
import { Controller, useFieldArray, useWatch, useFormState } from "react-hook-form"
import clsx from "clsx"

import Icon from "@mui/material/Icon"
import Collapse from "@mui/material/Collapse"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import FormHelperText from "@mui/material/FormHelperText"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"

import type { ListingForm } from "@/forms"
import { PicturesValidation } from "@/forms"
import IconButton from "@mui/material/IconButton"
import { ChangeEventHandler } from "react"

export default function AnnounceImageUpload({ control }: { control: Control<ListingForm> }) {
  const formState = useFormState({
    name: "pictures",
    control
  })
  const pictures = useWatch({
    name: "pictures",
    control
  })
  const field = useFieldArray({
    // @ts-expect-error Existe um erro na biblioteca
    name: "pictures",
    control
  })

  const error = formState.errors.pictures?.root

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files as FileList

    if (pictures.length + files.length > 5) return event.preventDefault()

    field.append([...files])

    event.target.value = ""
  }

  const handleRemove = (index: number) => {
    return field.remove(index)
  }

  return (
    <Box className="announce-image-upload">
      <Stack className="aiu-scrollable">
        {!!pictures.length && (
          <Stack className="aius-images">
            {pictures.map((picture, index) => (
              <Box key={index} className="aiusi-wrapper">
                <IconButton className="aiusiw-button" color="inherit" size="small" onClick={() => handleRemove(index)}>
                  <Icon>delete</Icon>
                </IconButton>

                <img src={URL.createObjectURL(picture)} className="aiusiw-image" />
              </Box>
            ))}
          </Stack>
        )}

        <ButtonBase
          className={clsx("aius-button", { error, images: !!pictures.length, hidden: pictures.length >= 5 })}
          component="label">
          <Controller
            name="pictures"
            control={control}
            rules={PicturesValidation}
            render={(state) => (
              <input
                {...state.field}
                className="aiusb-input"
                accept="image/jpg, image/jpeg, image/png, image/webp"
                type="file"
                value=""
                multiple
                onChange={handleChange}
              />
            )}
          />

          <Stack className={clsx("aiusb-container", { error })}>
            <Box className="aiusbc-circle">
              <Icon className="aiusbcc-icon">add_photo_alternate</Icon>
            </Box>

            <Typography className="aiusbc-title">Adicionar fotos</Typography>

            <Typography variant="caption">Somente JPG/JPEG, PNG ou WEBP</Typography>
          </Stack>
        </ButtonBase>
      </Stack>

      <Collapse in={!!error} unmountOnExit>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </Collapse>
    </Box>
  )
}
