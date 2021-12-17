import { useState } from 'react/cjs/react.development';
import {useSelectHook} from './selectHook';

export function Select() {

    const {carMakes, onChangeHandler, carData, carModels, vehicles = []} = useSelectHook();
    let columns = [];
    if(vehicles?.length){
        columns = Object.keys(vehicles[0]);
    }
    console.log(columns)

    return (
        <div>
            <label>Wybierz markę</label>
            <select name="makes" value={carData.make} onChange={onChangeHandler} id="make">
                {carMakes?.map((carMake) => {
                    return <option value={carMake} key={`marka=${carMake}`} >{carMake}</option>
                })}
                
            </select>
            <label>Wybierz model</label>
            <select name="models" id="model" onChange={onChangeHandler} value={carData.model}>
                {carModels?.map((carModel) => {
                    return <option value={carModel} key={`model=${carModel}`}>{carModel}</option>
                })}
            </select> 
            <div>
                {vehicles?.length && (
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {columns.map((el) => {
                            return <th key={el} scope="col">{el}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((row) => {
                            console.log('row', row)
                            
                            return (
                                <tr>
                                    <td><input type="radio" name="vehicle" onClick={() => {alert(JSON.stringify(row))}} /></td>
                                    {columns.map((columnName) => (
                                        <td>{row[columnName]}</td>
                                    )
                                        
                                    )}
                                   
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    )
}