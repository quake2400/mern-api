import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import TablaEmpresa from './components/TablaEmpresa';

const url= "http://localhost:4000/api/empresas";

function App() {

  const [datos, guardarDatos] = useState(null);

  useEffect(()=>{
    const peticionGet = async() =>{
      await refrescarTabla();
    }
    peticionGet();
  }, []);

  const updateReg = async (objEmpresa) =>{
    
   await axios.put(url+'/'+objEmpresa.form.id, objEmpresa.form);

    refrescarTabla();
  }

  const refrescarTabla = async () =>{
    await axios.get(url).then(response =>{
      guardarDatos(response.data.empresa);
    })
  }

  const insertReg = async (objEmpresa) =>{

    await axios.post(url, objEmpresa.form);

    refrescarTabla();
  }

  const deleteReg = async (id) => {

    //console.log(id); 

    await axios.delete(url+'/'+id);

    refrescarTabla();

  }

  return (
    <div className="App">
    <br /><br /><br />
      <TablaEmpresa
        updateReg={updateReg}
        datos={datos}
        insertReg={insertReg}
        deleteReg={deleteReg}
      /> 
    </div>   
  );
}

export default App;