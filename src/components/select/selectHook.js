import { useEffect, useState } from 'react';
import { useFetch } from '../../common/useFetchHook';

export function useSelectHook(){

    const initialCarData = {
        make: "",
        model: "",
    }
    
    const [carData, setCarData] = useState(initialCarData)

    const [readyForGetMakes, setReadyForGetMakes] = useState(true)
    const {data: carMakes, error: carMakesError} = useFetch("/api/makes", readyForGetMakes)

    const [readyForGetModels, setReadyForGetModels] = useState(false)
    const {data: carModels} = useFetch(`/api/models?make=${carData.make}`, readyForGetModels)

    const [readyForGetVehicles, setReadyForGetVehicles] = useState(false)
    const {data: vehicles} = useFetch(`/api/vehicles?make=${carData.make}&model=${carData.model}`, readyForGetVehicles)

    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if(carData.make){
            setReadyForGetModels(true)
        }
    }, [carData.make])

    useEffect(() => {
        setReadyForGetModels(false)
        setReadyForGetMakes(false)
    }, [carMakes, carModels])

    useEffect(() => {
        if(carData.model){
            setReadyForGetVehicles(true)
        }
    }, [carData.model])

    useEffect(() => {
        setReadyForGetVehicles(false)
    }, [vehicles])

    useEffect(() => {
        if(carMakesError){
            setErrorMessage("Something went wrong! Please refresh")
        }
    }, [carMakesError])

    function onChangeHandler(event){
        const id = event.target.id;
        const value = event.target.value;
        const newState = {...carData};
        newState[id] = value;
        setCarData(newState);
    }
    
    return {carMakes, onChangeHandler, carData, carModels, vehicles, errorMessage}
}
