import "maplibre-gl/dist/maplibre-gl.css"
import "./ListingMap.scss"

import { useCallback, useMemo, useRef } from "react"
import type { ViewState, MapRef, LngLatBoundsLike, LngLatLike } from "react-map-gl/maplibre"
import Map, { Marker } from "react-map-gl/maplibre"

import type { TLocation } from "~/schemas"
import { env } from "~/env"

const BrasilInitialViewState: Partial<ViewState> = {
  longitude: -51.92,
  latitude: -14.23,
  zoom: 2
}

export default function ListingMap({ location }: { location?: TLocation }) {
  const mapRef = useRef<MapRef | null>(null)

  const [latitude, longitude] = useMemo(() => [location?.lat, location?.lon], [location])

  const fitBounds = useCallback(() => {
    if (!mapRef.current || !location?.boundingbox || !Array.isArray(location?.boundingbox)) return

    const bbox = location.boundingbox
    const northEast: LngLatLike = [bbox[2], bbox[0]]
    const southWest: LngLatLike = [bbox[3], bbox[1]]

    const bounds: LngLatBoundsLike = [northEast, southWest]

    mapRef.current.fitBounds(bounds, { padding: 16, animate: false })
  }, [location?.boundingbox])

  return (
    <Map
      reuseMaps
      ref={mapRef}
      mapLib={import("maplibre-gl")}
      mapStyle={env.MAP_STYLE}
      onLoad={fitBounds}
      initialViewState={BrasilInitialViewState}
      dragRotate={false}
      attributionControl={false}
      minZoom={0}
      maxZoom={20}
      RTLTextPlugin="">
      {!!(longitude && latitude) && <Marker longitude={longitude} latitude={latitude} />}
    </Map>
  )
}
