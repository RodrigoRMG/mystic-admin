import React, {useState, useEffect} from 'react';
import './App.css';

interface Turno {
  id?: number;
  name: string;
  project: string;
}

const getTurnos = async(cb:any, setProject:any, setName:any)=> {
  fetch('http://157.245.117.205:3000/api/turnos')
  .then(res=>res.json())
  .then(res=>{
    cb(res)
    setProject("")
    setName("")
  });
}

const agregarTurno = async(cb:any, data:Turno)=> {
  fetch('http://157.245.117.205:3000/api/turnos',{
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
const removeTurno = async (cb: any, setProject: any, setName: any, data: any) => {
  fetch('http://157.245.117.205:3000/api/finish',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res=>res.json())
  .then(res=>{
    getTurnos(cb, setProject, setName);
  })
}

function App() {
  
  const [name, setName] = useState('')
  const [project, setProject] = useState('')
  const [turnos, setTurnos] = useState<Turno[]>([])
  
  const save=(evt:any)=>{
    evt.preventDefault();

    if(name==="" || project==="")
    {
      return alert("Debes ingresar el nombre de la persona y el proyecto")
    }
    const turno = {
      name, project
    }
   agregarTurno(setTurnos, turno);
  }

  const remove = (id:number) => {
    const data = {
      id,
      finished: true
    }
    removeTurno(setTurnos, setProject, setName, data);
  }

  useEffect(()=>{
    getTurnos(setTurnos, setProject, setName)
  }, []);

  return (
    <div className="App">
      <h1 className="main-title">Lista de espera</h1>
      <form onSubmit={save} className="form">
        <div>
          <input style={{color: "#FFF"}} name="proyecto" type="text" onChange={evt=>setName(evt.target.value)} placeholder="Nombre" />
        </div>
        <div>
          <input style={{color: "#FFF"}} name="nombre" type="text" onChange={evt=>setProject(evt.target.value)} placeholder="Proyecto" />  
        </div>

        <div>
          <input className="btn" type="submit" value="Agregar" />
        </div>
        
       
      </form>
      <div>
        <div className="container">
          <div className="card">
            <ul className="list">
              {
                turnos.map((turno:any) =>(
                  <li style={{marginBottom: 20}}>
                    <div className="valign-wrapper">
                      <h1 style={{margin: '0 10px 0 0', fontSize: '3rem'}}>{turno.number}</h1>
                      <div className="title">
                        {turno.name} - {turno.project}<br />
                        <span>Jan 9, 2017</span>
                      </div>
                      <button className="button" onClick={()=>remove(turno.id)}> <i className="material-icons ml-auto waves-effect" style={{width: 'auto'}}>close</i></button>
                    </div>
                  </li>
                ))
              }
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
