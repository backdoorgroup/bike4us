import { IMaskMixin } from "react-imask"
import { ComponentProps } from "react"

import TextField, { type TextFieldProps } from "@mui/material/TextField"

export const InternalMaskableTextField = IMaskMixin((props) => <TextField {...props} />)

export default function MaskableTextField(props: TextFieldProps & ComponentProps<typeof InternalMaskableTextField>) {
  return <InternalMaskableTextField {...props} />
}
