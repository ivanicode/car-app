import {useReducer, useEffect} from 'react';


export const initialData = {
    requesting: false,
    data: null,
    error: null,
};


export function reducer(state, action) {
    switch(action?.type) {
        case 'requesting':
            return { ...state, requesting: true };
        case 'success':
            return { ...initialData, data: action.data };
        case 'error':
            return { ...state, error: action.error, requesting: false };
        default:
            return state;
    }
}

export function useFetch(path, readyForMakeRequest = true, readyForVehicleRequest = true) {
    const [fetchState, dispatch] = useReducer(reducer, initialData);
    function makeRequest(){
        dispatch({ type: 'requesting' });
            fetch(path)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: 'success', data });
                })
                .catch(error => {
                    dispatch({ type: 'error', error});
                    console.error(error);
                })
    }
    useEffect(
        () => {
            if(readyForMakeRequest){
                makeRequest()
            }
        },
        [readyForMakeRequest]
    );
    useEffect(
        () => {
            if(readyForVehicleRequest){
                makeRequest()
            }
        }, 
        [readyForVehicleRequest]
    )
    return fetchState;
}


