import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useRide } from "./RideProvider";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { getDirections } from "../services/direction";
import * as Location from 'expo-location';

interface DriverProps{
    drivers:User[]
    selectedDriver:User | null
    setSelectedDriver:(driver:User)=>void
    direction: DirectionsResponse | null;
    directionCoordinate: [number, number][] | undefined;
    duration: number | undefined;
    distance: number | undefined;
}

const DriverContext = createContext<DriverProps | undefined>(undefined)

export default function DriverProvider({children}:PropsWithChildren){

    // ------------------------------------------------------------------
    // constants
    const {location} = useRide()
    const { url} = useAuth()

    // ------------------------------------------------------------------
    // states
    const [drivers, setDrivers] = useState<User[]>([])
    const [selectedDriver, setSelectedDriver] = useState<User | null>(null)
    const [direction,setDirection] = useState<DirectionsResponse | null>(null)

    // -------------------------------------------------------------------
    // functions
    const fetchDrivers =async()=>{
        try {
            const res = await axios.get(`${url}/user/nearby/${location[0]},${location[1]}`)
            setDrivers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDirections =async()=>{
        if(selectedDriver && selectedDriver.location ){
            const myLocation = await Location.getCurrentPositionAsync()
            const newDirection = await getDirections(
                [myLocation.coords.longitude, myLocation.coords.latitude],
                [selectedDriver.location?.coordinates[0],selectedDriver.location?.coordinates[1]]
            )

            setDirection(newDirection)
        }
    }

    // --------------------------------------------------------------------
    // use effects
    useEffect(()=>{
        if(location){
            fetchDrivers()
        }
    },[])
    
    useEffect(()=>{
        if(selectedDriver){
            fetchDirections()
        }
    },[])


    return(
        <DriverContext.Provider 
        value={{
            drivers,
            selectedDriver, 
            setSelectedDriver,
            direction,
            directionCoordinate: direction?.routes?.[0]?.geometry?.coordinates,
            duration: direction?.routes?.[0].duration,
            distance: direction?.routes?.[0].distance,
            }}>
            {children}
        </DriverContext.Provider>
    )
}

export const useDriver =():DriverProps=>{
    const context = useContext(DriverContext)
    if(!context){
        throw new Error('useDriver must be used within Driver Provider')
    }
        return context
}