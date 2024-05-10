// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";

import { GeoJSON } from "react-leaflet/GeoJSON";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [geojson, setGeojson] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null);

  useEffect(() => {
    axios.get("/bairros-geojson").then((res) => setGeojson(res.data.features));
  }, []);

  const handleBairroFeatureHover = (feature, layer) => {
    if (activeLayer) {
      activeLayer.setStyle({
        weight: 2,
      });
    }
    setActiveLayer(layer);
    layer.setStyle({
      weight: 5,
    });

    axios.get(`/populacao?bairroId=${feature.properties.id}`).then((res) => {
      const dataFiltered = res.data.filter(
        (data) => data.id_geometria === feature.properties.id
      );
      setFilteredData(dataFiltered);
      const tooltipContent = dataFiltered
        .map((d) => `Year: ${d.ano}, Population: ${d.populacao}`)
        .join("<br/>");
      layer.bindTooltip(tooltipContent).openTooltip();
    });
  };

  return (
    <div className="flex justify-between">
      <MapContainer
        className="h-[calc(100vh-100px)] w-full"
        zoom={15}
        bounds={[
          [-23.234708, -45.928813],
          [-23.198917, -45.900761],
        ]}
      >
        <TileLayer url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr" />
        {geojson && (
          <GeoJSON
            data={geojson}
            style={{ color: "#6c58ff" }}
            eventHandlers={{
              mouseover: (event) => {
                handleBairroFeatureHover(
                  event.sourceTarget.feature,
                  event.sourceTarget
                );
              },
              mouseout: (event) => {
                event.sourceTarget.setStyle({
                  weight: 2,
                  color: "#6c58ff",
                });
                event.sourceTarget.closeTooltip();
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default App;
