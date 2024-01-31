import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import "./application.css";
import "ol/ol.css";
import { KommuneLayerCheckbox } from "../kommune/kommuneLayerCheckbox";
import { Layer } from "ol/layer";

useGeographic();

const map = new Map({
  view: new View({ center: [11, 60], zoom: 10 }),
});

export function Application() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);

  useEffect(() => map.setTarget(mapRef.current), []);

  useEffect(() => {
    map.setLayers(layers);
  }, [layers]);

  function handleFocusUser(e: React.MouseEvent) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.getView().animate({
        center: [longitude, latitude],
        zoom: 12,
      });
    });
  }

  return (
    <>
      <header>
        <h1>Kart</h1>
      </header>
      <nav>
        <a href="#" onClick={handleFocusUser}>
          Focus on me
        </a>
        <KommuneLayerCheckbox map={map} setLayers={setLayers} />
      </nav>
      <div ref={mapRef}></div>
    </>
  );
}
