import '../.././App.css';
import { MapContainer, TileLayer, Marker, Popup, Map } from 'react-leaflet'
import { useMap,useMapEvent, useMapEvents } from 'react-leaflet/hooks'
import { useState, useEffect } from "react";
import L from "leaflet";


function GetIcon(iconSize) {
  return L.icon({
    iconUrl: require("../.././dotimg.png"),
    iconSize: [iconSize],
  });
}


const FlightTrackerMap = () => {

	const [states, setStates] = useState([]);

	// fetches airplane data every 30 seconds
	useEffect(() => {
		const interval = setInterval(() => {
		    console.log('Logs every 30 seconds');
		    fetch('https://opensky-network.org/api/states/all')
	  		.then(response => response.json())
	  		.then(data => {
	  			setStates(data.states.slice(0, 50));
  			});
		  }, 30000);

  		return () => clearInterval(interval);
	}, []);




  return (
      	<MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
		  <TileLayer
		    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		  />
		  {
		  	states?.map((st, index) => {
		  		return <Marker position={[((st[6]) == null) ?  (0.0):st[6], ((st[5]) === null) ? (0.0):st[5]]} icon={GetIcon(32)}>
					    <Popup>
					      {((st[1]) == null) ?  (" "):st[1]}
					    </Popup>
					  </Marker>
		  	})
		  }
		  
		</MapContainer>
  )
}

export default FlightTrackerMap;