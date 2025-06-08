"use client"

import React, {useEffect, useState} from 'react'
import {Map, Marker, MarkerEvent} from '@vis.gl/react-maplibre';
import "maplibre-gl/dist/maplibre-gl.css";

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    error: GeolocationPositionError | null;
    loading: boolean;
}

function Page() {
    const [currentLocation, setCurrentLocation] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setCurrentLocation((prev) => ({ ...prev, error: { message: "Geolocation is not supported by your browser." } as any, loading: false }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude, error: null, loading: false });
                console.log("User location:", { latitude, longitude });
            },
            (error) => {
                setCurrentLocation((prev) => ({ ...prev, error, loading: false }));
                console.error("Geolocation error:", error);
            }
        );
    }, []);

    const [viewState, setViewState] = React.useState({
        longitude: 84,
        latitude: 28,
        zoom: 5.5,
    });

    return (
        <>
            <Map
                initialViewState={viewState}
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: 600, height: 400 }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
            >
                {(currentLocation.latitude && currentLocation.longitude) ? (
                    <Marker
                        key={"marker-1"}
                        draggable={true}
                        longitude={currentLocation.longitude}
                        latitude={currentLocation.latitude}
                        color={"#60d3ea"}
                        onDragEnd={(e) => setCurrentLocation({
                            latitude: e.lngLat.lat,
                            longitude: e.lngLat.lng,
                            error: null,
                            loading: false,
                        })}
                        onClick={(e) => setViewState({
                            latitude: e.target._lngLat.lat,
                            longitude: e.target._lngLat.lng,
                            zoom: 17
                        })}
                    />
                ) : null}
            </Map>
        </>
    );
}

export default Page
