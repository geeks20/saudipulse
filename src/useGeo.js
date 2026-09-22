import { useEffect, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { regions, pulseCities } from './data.js'

export const MAP_W = 900
export const MAP_H = 760

const ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json'

let cached = null

export function useGeo() {
  const [geo, setGeo] = useState(cached)

  useEffect(() => {
    if (cached) return
    let alive = true
    ;(async () => {
      try {
        const res = await fetch(ATLAS_URL)
        const topo = await res.json()
        const fc = feature(topo, topo.objects.countries)
        const sa = fc.features.find((f) => f.properties && f.properties.name === 'Saudi Arabia')
        if (!sa) return
        const proj = geoMercator().fitExtent([[40, 40], [MAP_W - 40, MAP_H - 40]], sa)
        const path = geoPath(proj)
        const pts = {}
        regions.forEach((r) => { pts[r.id] = proj([r.lng, r.lat]) })
        const cityPts = {}
        pulseCities.forEach((c) => { cityPts[c.ar] = proj([c.lng, c.lat]) })
        cached = { path: path(sa), pts, cityPts }
        if (alive) setGeo(cached)
      } catch (e) {
        console.warn('geo load failed', e)
      }
    })()
    return () => { alive = false }
  }, [])

  return geo
}
