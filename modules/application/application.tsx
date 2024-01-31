import React, { MutableRefObject, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

useGeographic();

const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({ center: [11, 60], zoom: 10 }),
});

export function Application() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => map.setTarget(mapRef.current), []);

  return <div ref={mapRef}>Map here</div>;
}
