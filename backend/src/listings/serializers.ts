import { Listing } from "@/listings/models"

export const serializeListing = (listing: Listing) => ({
  id: listing.id,
  ownerUid: listing.ownerUid,
  createdAt: listing.createdAt,
  updatedAt: listing.updatedAt,
  title: listing.title,
  description: listing.description,
  hourPricing: listing.hourPricing,
  status: listing.status,
  picturePath: listing.picturePath // TODO: isso aqui é um caminho absoluto na máquina do backend, tem que converter pra um caminho batendo no endpoint /static/nome-do-arquivo
})
