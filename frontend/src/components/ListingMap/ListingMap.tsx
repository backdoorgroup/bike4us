import "maplibre-gl/dist/maplibre-gl.css"
import "./ListingMap.scss"

import { useCallback, useMemo } from "react"
import type { LngLatBoundsLike, LngLatLike, MapEvent, ViewState } from "react-map-gl/maplibre"
import Map, { Marker } from "react-map-gl/maplibre"

import { env } from "~/env"
import type { TLocation } from "~/schemas"

const SouthAmerica: Partial<ViewState> = {
  longitude: -55.4915,
  latitude: -8.7832,
  zoom: 0
}

export default function ListingMap({ location }: { location?: TLocation }) {
  const [longitude, latitude] = useMemo(() => [location?.lon, location?.lat], [location])
  const bbox = useMemo(() => location?.boundingbox, [location?.boundingbox])

  const fitBounds = useCallback(
    (event: MapEvent) => {
      if (!bbox || !Array.isArray(bbox)) return

      const northEast: LngLatLike = [bbox[2], bbox[0]]
      const southWest: LngLatLike = [bbox[3], bbox[1]]

      const bounds: LngLatBoundsLike = [northEast, southWest]

      event.target.fitBounds(bounds)
    },
    [bbox]
  )

  return (
    <Map
      mapStyle={env.MAP_STYLE}
      onLoad={fitBounds}
      initialViewState={SouthAmerica}
      dragRotate={false}
      attributionControl={false}
      minZoom={0}
      maxZoom={20}
      RTLTextPlugin="">
      {!!(longitude && latitude) && <Marker longitude={longitude} latitude={latitude} />}
    </Map>
  )
}
