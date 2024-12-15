import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useAuth } from './AuthProvider';
import axios from 'axios';

interface RideProps {
    startRide:(driverId:string)=>void
    route:[number,number][]
    location:[number,number][]
}

const RideContext = createContext<RideProps | undefined>(undefined)

export default function RideProvider({children}:PropsWithChildren){

    // -------------------------------------------------------------------------------------------------------------------------------
    // states
    
    const [route, setRoute] =useState<[number,number][]>([])
    const [location, setLocation] =useState<[number,number][]>([])

    // -------------------------------------------------------------------------------------------------------------------------------
    // constants
    
    let subscription: Location.LocationSubscription | undefined;
    const {url,userData} = useAuth()

    // -------------------------------------------------------------------------------------------------------------------------------
    // functions

    // request Location
    const requestPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.error("Permission to access location was denied");
            return false;
        }
        return true;
    };

    // watch location function
    const watchLocation =async()=>{
        subscription = await Location.watchPositionAsync({distanceInterval:20},(newLocation)=>{
            setRoute((currentRoute)=>[
                ...currentRoute,[newLocation.coords.longitude, newLocation.coords.latitude]
            ])
        })
    }

    // get Location function
    const getLocation =async()=>{
        try {
            const myLocation = await Location.getCurrentPositionAsync()
            setLocation([[myLocation.coords.longitude, myLocation.coords.latitude]])
        } catch (error) {
            console.log(error)
        }
    }

    // start Ride
    const startRide=async(driverId:string)=>{
        try {
            if(userData){
                const res = await axios.post(`${url}/trip/start`,{
                    driver_id:driverId,
                    passenger_id:userData._id,
                    activity:true
                })
                // console.log(res.data)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    // --------------------------------------------------------------------------------------------------------------------------------
    // use Effects

    useEffect(() => {
        const initialize = async () => {
            const hasPermission = await requestPermissions();
            if (hasPermission) {
                watchLocation();
                getLocation();
            }
        };
        initialize();
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);
    

    return(
        <RideContext.Provider value={{route,startRide, location}}>
            {children}
        </RideContext.Provider>
    )
}


export const useRide =():RideProps=>{
    const context = useContext(RideContext)
    if(!context){
        throw new Error('useRide must be used within RideProvider')
    }
    
    return context
    
}