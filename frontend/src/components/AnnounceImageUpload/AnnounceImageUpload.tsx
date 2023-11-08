import "./AnnounceImageUpload.scss"

import clsx from "clsx"
import type { ChangeEventHandler } from "react"
import { useMemo } from "react"
import type { Control } from "react-hook-form"
import { Controller, useFieldArray, useFormState, useWatch } from "react-hook-form"

import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import Collapse from "@mui/material/Collapse"
import FormHelperText from "@mui/material/FormHelperText"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import type { ListingForm } from "~/forms"
import { PicturesValidation } from "~/forms"

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

  const errors = useMemo(() => formState.errors.pictures, [formState.errors.pictures])

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
      <Box className="aiu-wrapper">
        <Stack className="aiuw-scrollable">
          <Stack className={clsx("aiuws-images", { hidden: !pictures.length })}>
            {pictures.map((picture, index) => (
              <Box key={index} className="aiuwsi-wrapper">
                <IconButton className="aiuwsiw-button" color="inherit" size="small" onClick={() => handleRemove(index)}>
                  <Icon>delete</Icon>
                </IconButton>

                <img src={URL.createObjectURL(picture)} className="aiuwsiw-image" />
              </Box>
            ))}
          </Stack>

          <ButtonBase
            className={clsx("aiuws-button", {
              "error": !!errors,
              "hidden": pictures.length >= 5,
              "full-width": !pictures.length
            })}
            component="label">
            <Controller
              name="pictures"
              control={control}
              rules={PicturesValidation}
              render={(state) => (
                <input
                  {...state.field}
                  className="aiuwsb-input"
                  accept="image/jpg, image/jpeg, image/png, image/webp"
                  type="file"
                  value=""
                  multiple
                  onChange={handleChange}
                />
              )}
            />

            <Stack className={clsx("aiuwsb-container", { error: !!errors })}>
              <Box className="aiuwsbc-circle">
                <Icon className="aiuwsbcc-icon">add_photo_alternate</Icon>
              </Box>

              <Typography className="aiuwsbc-title">Adicionar fotos</Typography>

              <Typography variant="caption">Somente JPG/JPEG, PNG ou WEBP</Typography>
            </Stack>
          </ButtonBase>
        </Stack>
      </Box>

      <Collapse in={!!errors} unmountOnExit>
        <FormHelperText error={!!errors}>{errors?.message || errors?.root?.message}</FormHelperText>
      </Collapse>
    </Box>
  )
}
