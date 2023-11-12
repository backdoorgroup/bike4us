import "maplibre-gl/dist/maplibre-gl.css"
import "./ListingMap.scss"

import type { ViewState } from "react-map-gl/maplibre"
import Map, { Marker } from "react-map-gl/maplibre"

import type { TLocation } from "~/schemas"
import { env } from "~/env"
import { useMemo } from "react"

const BrasilInitialViewState: Partial<ViewState> = {
  longitude: -51.92,
  latitude: -14.23,
  zoom: 2
}

export default function ListingMap({ location }: { location?: TLocation | null }) {
  const [latitude, longitude] = useMemo(
    () => [location?.coordinates?.latitude, location?.coordinates?.longitude],
    [location?.coordinates]
  )

  const AddressInitialViewState = useMemo<Partial<ViewState> | false>(() => {
    return (
      !!(latitude && longitude) && {
        latitude,
        longitude,
        zoom: 13
      }
    )
  }, [latitude, longitude])

  return (
    <Map
      reuseMaps
      mapLib={import("maplibre-gl")}
      mapStyle={env.MAP_STYLE}
      initialViewState={AddressInitialViewState || BrasilInitialViewState}
      dragRotate={false}
      attributionControl={false}
      minZoom={0}
      maxZoom={20}
      RTLTextPlugin="">
      {!!(longitude && latitude) && <Marker longitude={longitude} latitude={latitude} />}
    </Map>
  )
}
