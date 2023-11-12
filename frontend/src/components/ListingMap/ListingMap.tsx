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
  const coordinates = useMemo(() => location?.coordinates, [location?.coordinates])

  const [latitude, longitude] = useMemo(() => [coordinates?.latitude, coordinates?.longitude], [coordinates])

  const initialViewState = useMemo<Partial<ViewState> | null>(() => {
    return latitude && longitude
      ? {
          latitude,
          longitude,
          zoom: 13
        }
      : null
  }, [latitude, longitude])

  return (
    <Map
      reuseMaps
      mapLib={import("maplibre-gl")}
      mapStyle={env.MAP_STYLE}
      initialViewState={initialViewState || BrasilInitialViewState}
      dragRotate={false}
      attributionControl={false}
      minZoom={0}
      maxZoom={20}>
      {!!(longitude && latitude) && <Marker longitude={longitude} latitude={latitude} />}
    </Map>
  )
}
