import type { ComponentProps } from "react"
import { IMaskMixin } from "react-imask"

import TextField, { type TextFieldProps } from "@mui/material/TextField"

type MaskableTextFieldProps = TextFieldProps & ComponentProps<typeof InternalMaskableTextField>

export const InternalMaskableTextField = IMaskMixin((props) => <TextField {...(props as MaskableTextFieldProps)} />)

export default function MaskableTextField(props: MaskableTextFieldProps) {
  return <InternalMaskableTextField {...props} />
}
