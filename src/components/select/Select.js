import {useSelectHook} from './selectHook';
import './select.css';

export function Select() {

    const {carMakes, onChangeHandler, carData, carModels, vehicles = [], errorMessage} = useSelectHook();

    let columns = [];
    if(vehicles?.length){
        columns = Object.keys(vehicles[0]);
    }
    return (
        <div>
            <div style={{color: "red"}}>
                <strong>{errorMessage}</strong>
            </div>
            <div className='selects'>
                <div className='makeSelect'>
                    <label htmlFor='make'>Choose a make</label>
                    <select name="makes" value={carData.make} onChange={onChangeHandler} id="make">
                        {carMakes?.map((carMake) => {
                            return <option value={carMake} key={`marka=${carMake}`} >{carMake}</option>
                        })}
                    </select>
                </div>
                <div className='modelSelect'>
                    <label htmlFor='model'>Choose a model</label>
                    <select name="models" id="model" onChange={onChangeHandler} value={carData.model} disabled={!carData.make}>
                        {carModels?.map((carModel) => {
                            return <option value={carModel} key={`model=${carModel}`}>{carModel}</option>
                        })}
                </select> 
                </div>
            </div>
            <div className='table'>
                {vehicles?.length && (
                    <div className='table-div'>
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
                                {vehicles.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><input type="radio" name="vehicle" onClick={() => {alert(JSON.stringify(row))}} /></td>
                                            {columns.map((columnName) => (<td key={(Math.floor(Math.random() * 100)) * Date.now()+row[columnName]}>{row[columnName]}</td>))}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}