import {useEffect, useState} from 'react';
import {requestAccessLocationPermission} from 'utils/permission';
import Geolocation from 'react-native-geolocation-service';
import {LocationType} from '@/types';

const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationType>();

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const res = await requestAccessLocationPermission();
        if (res === 'granted') {
          Geolocation.getCurrentPosition(
            pos => {
              const {latitude, longitude} = pos.coords;
              setLocation({latitude, longitude});
            },
            error => {
              console.warn(error);
            },
            {enableHighAccuracy: true, timeout: 3600, maximumAge: 3600},
          );
        }
      } catch (error) {
        console.warn(error);
      }
    };

    fetchCurrentLocation();
  }, []);

  return {location, setLocation};
}

export default useCurrentLocation;
