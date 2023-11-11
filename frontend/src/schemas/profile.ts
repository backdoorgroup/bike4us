import { z } from "zod"

export const UserMetadata = z.object({
  creationTime: z.string(),
  lastSignInTime: z.string(),
  lastRefreshTime: z.string().nullable().optional()
})

export const UserInfo = z.object({
  uid: z.string(),
  displayName: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  photoURL: z.string().nullable().optional(),
  providerId: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional()
})

export const User = UserInfo.extend({
  disabled: z.boolean(),
  emailVerified: z.boolean(),
  metadata: UserMetadata,
  providerData: z.array(UserInfo),
  tokensValidAfterTime: z.string()
}).nullable()
export type TUser = z.infer<typeof User>

export const Address = z
  .object({
    id: z.number(),
    city: z.string(),
    neighborhood: z.string(),
    number: z.string(),
    ownerUid: z.string(),
    state: z.string(),
    street: z.string(),
    zipcode: z.string(),
    complement: z.string()
  })
  .nullable()
export type TAddress = z.infer<typeof Address>

export const Profile = z.object({
  user: User,
  address: Address
})
export type TProfile = z.infer<typeof Profile>
