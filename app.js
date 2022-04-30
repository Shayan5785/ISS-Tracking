console.log("Running...")

const map = L.map('map').setView([0,0], 1);
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);


const myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [40, 45],
    iconAnchor: [22, 94],
});

const marker = L.marker([0, 0], {icon: myIcon}).addTo(map);



let api_URL = 'http://api.open-notify.org/iss-now.json'
let firstTime = true

async function getData(){
	const res = await fetch(api_URL)
	const data = await res.json()

	const latitude = data.iss_position.latitude;
	const longitude = data.iss_position.longitude;

	marker.setLatLng([latitude, longitude]);
	if (firstTime) {
		map.setView([latitude,longitude, 3])
		firstTime = false		
	}

	document.getElementById('lat').textContent = latitude
	document.getElementById('lon').textContent = longitude
}

getData()

setInterval(getData, 1000)
