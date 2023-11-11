import "maplibre-gl/dist/maplibre-gl.css"
import "./ListingMap.scss"

import type { ViewState } from "react-map-gl/maplibre"
import Map, { Marker } from "react-map-gl/maplibre"

import type { TLocation } from "~/schemas"
import { env } from "~/env"
import { useMemo } from "react"

const BrazilInitialViewState: Partial<ViewState> = {
  longitude: -51.92,
  latitude: -14.23,
  zoom: 2
}

export default function ListingMap({ location }: { location?: TLocation | null }) {
  const initialViewState = useMemo<Partial<ViewState> | null>(() => {
    const coordinates = location?.coordinates

    return coordinates?.longitude && coordinates?.latitude
      ? {
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          zoom: 12
        }
      : null
  }, [location?.coordinates])

  return (
    <Map
      mapLib={import("maplibre-gl")}
      initialViewState={initialViewState || BrazilInitialViewState}
      mapStyle={env.MAP_STYLE}>
      {/* {!!(longitude && latitude) && <Marker longitude={longitude} latitude={latitude} />} */}
    </Map>
  )
}
