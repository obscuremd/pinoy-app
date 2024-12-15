import Mapbox, {
    Camera,
    CircleLayer,
    Images,
    LineLayer,
    LocationPuck,
    MapView,
    ShapeSource,
    SymbolLayer,
  } from '@rnmapbox/maps';
  import { featureCollection, point } from '@turf/helpers';
  import React from 'react';
  
  import SingleMarker from './SingleMarker';
  import LineRoute from './LineRoute';
  import Markers from './Markers';
import { useRide } from '@/src/Providers/RideProvider';
import { useDriver } from '@/src/Providers/DriverProvider';
  
  
  Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map(){

  const { route } = useRide();
  const { directionCoordinate } = useDriver();

    return(
        <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
        <Camera followZoomLevel={11} followUserLocation />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
  
        {/* {rideRoute && ride && (
          <>
            <SingleMarker />
            {directionCoordinate && <LineRoute coordinate={directionCoordinate} />}
            <LineRoute coordinate={rideRoute} />
          </>
        )} */}
  
        {/* {!ride && ( */}
          <>
            <Markers />
            {directionCoordinate && <LineRoute coordinate={directionCoordinate} />}
          </>
         {/* )} */}
      </MapView>
    )
}