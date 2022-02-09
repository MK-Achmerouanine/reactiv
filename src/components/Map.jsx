import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  // addDoc,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";

const Map = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [villes, setVilles] = useState([]);
  const villesCollectionRef = collection(db, "villes");

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();

    villes.forEach(({ lat, lng }) => bounds.extend({ lat: parseFloat(lat), lng: parseFloat(lng) }));
    map.fitBounds(bounds);
    console.log("Bounds => " + bounds);
  };
  useEffect(() => {
    if (villes.length === 0) {
      const getVilles = async () => {
        const data = await getDocs(villesCollectionRef);
        setVilles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getVilles()
    }
    console.log(villes)
  }, [villes, villesCollectionRef]);

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      center={{ lat: 33.5731104, lng: -7.5898434 }}
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
    >
      {villes && villes.map(({ id, name, lat, lng }) => (
        <Marker
          key={id}
          position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          onClick={() => handleActiveMarker(id)}
          label={id}
          title={id}

        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)} >
              <>
                <img src="https://random.imagecdn.app/500/150" alt="city" />
                <h1>{id}</h1>
                <table>
                  <caption>{id} position</caption>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Latitude</th>
                      <td>{parseFloat(lat)}</td>
                    </tr>
                    <tr>
                      <th scope="row">longitude</th>
                      <td>{parseFloat(lng)}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
