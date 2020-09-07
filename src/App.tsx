import React, {useState, useEffect} from 'react';
import './App.css';

interface Turno {
  nombre: string;
  proyecto: string;
}

const getTurnos = async(cb:any)=> {
  fetch('http://localhost:3000/api/turnos')
  .then(res=>res.json())
  .then(res=>{
    cb(res)
  });
}

const agregarTurno = async(cb:any, data:Turno)=> {
  fetch('http://localhost:3000/api/turnos',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res=>res.json())
  .then(res=>{
    cb(res)
  })
}

function App() {
  
  const [nombre, setNombre] = useState('')
  const [proyecto, setProyecto] = useState('')
  const [turnos, setTurnos] = useState<Turno[]>([])
  
  const save=(evt:any)=>{
    evt.preventDefault();

    const turno = {
      nombre, proyecto
    }
    console.log(turno)
   // agregarTurno(setTurnos, turno);
  }

  useEffect(()=>{
    getTurnos(setTurnos)
  }, []);

  return (
    <div className="App">
      <h1 className="title">Lista de espera</h1>
      <form onSubmit={save}>
        <div>
          <input name="proyecto" type="text" onChange={evt=>setNombre(evt.target.value)} placeholder="Nombre" />
        </div>
        <div>
          <input name="nombre" type="text" onChange={evt=>setProyecto(evt.target.value)} placeholder="Proyecto" />  
        </div>

        <div>
          <input type="submit" value="Agregar" />
        </div>
        
       
      </form>
      <div>
        <ul>
          {
            turnos.map((turno:any) =>(
              <li key={turno.id}>
                {turno.name} - {turno.project}
              </li>
            ))
          }
        </ul>
      </div>
    
    </div>
  );
}

export default App;
