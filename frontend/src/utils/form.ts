/* eslint-disable @typescript-eslint/no-explicit-any */

export const transform = (params: { [key: string]: any }) => {
  params = params || {}

  const formData = new FormData()

  Object.entries(params).forEach(([key, value]) => {
    if (!value || !key) return

    formData.append(key, value)
  })

  return formData
}
