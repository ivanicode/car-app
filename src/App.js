import './App.css';
import {Select} from './components/select/Select'
//import {useFetch} from './common/useFetchHook'

function App() {
  //const {data: carsMakes} = useFetch("/api/makes")
  //const {data: vehicles} = useFetch("/api/vehicles?make=FORD&model=Fiesta")
  //console.log('marki samochodów', carsMakes)
  //console.log('samochody', models)
  return (
    <div className="App">
      <Select />
    </div>
  );
}

export default App;
