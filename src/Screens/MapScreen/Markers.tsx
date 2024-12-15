import { View, Text } from 'react-native'
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
  import { OnPressEvent } from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
  import { featureCollection, point } from '@turf/helpers';
  import React from 'react';
  
  import pin from '../../../assets/pin.png';
import { useDriver } from '@/src/Providers/DriverProvider';

const Markers = () => {
    const { setSelectedDriver, drivers } = useDriver();

      // Convert drivers to GeoJSON points
      const points = drivers
      .filter(
        (driver) =>
          driver.location?.coordinates && // Ensure `location` exists and has `coordinates`
          driver.location.coordinates.length === 2 // Ensure coordinates are valid
      )
      .map((driver) =>
        point(driver.location!.coordinates, {
          driver, // Attach driver data to the point's properties
        })
      );
    
    const driverFeatures = featureCollection(points);
  
    const onPointPress = async (event: OnPressEvent) => {
      // console.log(JSON.stringify(event,null,2))
      if (
        event?.features?.length && // Check if there are features
        event.features[0]?.properties && // Ensure properties is not null or undefined
        event.features[0].properties.scooter // Check if the scooter property exists
      ) {
        setSelectedDriver(event.features[0].properties.scooter);
      } else {
        console.log('No valid scooter data found on point press');
      }
    };
  
  //   console.log('features:',scooterFeatures)
  
    return (
      <>
        <ShapeSource id="scooters" cluster shape={driverFeatures} onPress={onPointPress}>
          <SymbolLayer
            id="cluster-count"
            style={{
              textField: ['get', 'point_count'],
              textSize: 16,
              textColor: '#ffffff',
              textPitchAlignment: 'map',
            }}
          />
  
          <CircleLayer
            id="clusters"
            belowLayerID="cluster-count"
            filter={['has', 'point_count']}
            style={{
              circleColor: '#4AC2B3',
              circlePitchAlignment: 'map',
              circleRadius: 20,
              circleOpacity: 0.7,
              circleStrokeWidth: 2,
              circleStrokeColor: 'white',
            }}
          />
  
          <SymbolLayer
            id="scooterIcon"
            filter={['!', ['has', 'point_count']]}
            style={{
              iconImage: 'pin',
              iconSize: 0.3,
              iconAllowOverlap: true,
              iconAnchor: 'bottom',
            }}
          />
  
          <Images images={{ pin }} />
        </ShapeSource>
  
        
      </>
    );
}

export default Markers