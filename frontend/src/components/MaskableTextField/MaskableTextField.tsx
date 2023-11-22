import type { ComponentProps } from "react"
import { IMaskMixin } from "react-imask"

import TextField, { type TextFieldProps } from "@mui/material/TextField"

export const InternalMaskableTextField = IMaskMixin((props) => <TextField {...(props as TextFieldProps)} />)

export default function MaskableTextField(props: TextFieldProps & ComponentProps<typeof InternalMaskableTextField>) {
  return <InternalMaskableTextField {...props} />
}
