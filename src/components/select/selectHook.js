import { useEffect, useState } from 'react';
import { useFetch } from '../../common/useFetchHook';

export function useSelectHook(){

    const initialCarData = {
        make: "",
        model: "",
    }

    const [carData, setCarData] = useState(initialCarData)

    const {data: carMakes} = useFetch("/api/makes")
    const [readyForGetModels, setReadyForGetModels] = useState(false)
    const {data: carModels} = useFetch(`/api/models?make=${carData.make}`, readyForGetModels)

    //const {dataForTable, setDataForTable} = useState([])
    const [readyForGetVehicles, setReadyForGetVehicles] = useState(false)
    const {data: vehicles} = useFetch(`/api/vehicles?make=${carData.make}&model=${carData.model}`, null, readyForGetVehicles)
    
    useEffect(() => {
        if(carData.make){
            setReadyForGetModels(true)
        }
    }, [carData.make])

    useEffect(() => {
        setReadyForGetModels(false)
    }, [carMakes, carModels])

    useEffect(() => {
        if(carData.model){
            setReadyForGetVehicles(true)
        }
    }, [carData.model])

    useEffect(() => {
        setReadyForGetVehicles(false)
    }, [vehicles])

    function onChangeHandler(event){
        const id = event.target.id;
        const value = event.target.value;
        const newState = {...carData};
        newState[id] = value;
        setCarData(newState);
    }
    
    return {carMakes, onChangeHandler, carData, carModels, vehicles}
}

//const {data: carModels} = useFetch(`/api/models?make=${choosenMake}`)
//let modelsUrl = "/api/models?make=" + carData.make;