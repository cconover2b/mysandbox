// components/map.tsx

// 'use client' directive is used in Next.js to indicate that this component should be rendered on the client side
'use client'

// Importing necessary libraries and hooks from React and Google Maps API
import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { LatLong } from '@/types';

// Function to build the content for the map info card
// This function returns a string of HTML with the title and body content
const buildMapInfoCardContent = (title: string, body: string): string => {
    return `
    <div class="map_infocard_content">
        <div class="map_infocard_title">${title}</div>
        <div class="map_infocard_body">${body}</div>
    </div>`;
}

// Defining the Map functional component
function Map(latlong: LatLong) {
    // Creating a reference to the div that will contain the map
    const mapRef = useRef<HTMLDivElement>(null)

    // Using the useEffect hook to initialize the map when the component mounts
    useEffect(() => {
        const initMap = async () => {
            // Creating a new Loader instance to load the Google Maps API
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string, // API key from environment variables
                version: 'weekly' // Version of the API to use
            })

            // Importing the necessary libraries from the Google Maps API
            const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary
            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

            // Setting the position for the map and marker
            const position = {
                lat: latlong.coordinates[0],
                lng: latlong.coordinates[1]
            }

            // Defining the options for the map
            const mapOptions = {
                center: position, // Centering the map at the given position
                zoom: 17, // Zoom level
                mapId: 'PETRESCUE-1234' // Custom map ID
            }

            // Creating a new map instance
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

            // Creating a new marker instance
            const marker = new Marker({
                map: map, // Associating the marker with the map
                position: position, // Position of the marker
                title: "Pet found here", // Title of the marker
                icon: {
                    url: 'marker_flag.png', // URL of the marker icon
                    size: new google.maps.Size(32, 32) // Size of the marker icon
                },
                animation: google.maps.Animation.DROP // Drop animation for the marker
            })

            // Creating a new info window instance
            const infoCard = new google.maps.InfoWindow({
                position: position, // Position of the info window
                content: buildMapInfoCardContent('title', 'body'), // Content of the info window
                minWidth: 200 // Minimum width of the info window
            })

            // Opening the info window on the map
            infoCard.open({
                map: map,
                anchor: marker // Anchoring the info window to the marker
            })
        }

        // Calling the initMap function to initialize the map
        initMap()
    }, [latlong.coordinates]); // Dependency array to re-run the effect if latlong.coordinates change

    return (
        // Div element that will contain the map
        <div style={{ height: '600px' }} ref={mapRef} />
    )
}

// Exporting the Map component as the default export
// This allows other parts of the application to import and use this component
export default Map
