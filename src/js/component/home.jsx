import React, { useEffect, useState } from "react";


const HOSTNAME = "https://assets.breatheco.de/apis/fake";

const Home = () => {
const [users,setUsers] = useState([]);
const [tareas,setTareas] = useState([]);
const [title,setTitle] = useState("");
const [usuario,setUsuario] = useState("");
const [tareaNueva,setTareaNueva] = useState("");
const [estado, setEstado] = useState("")

 const listaNombres = async () => {
 		const res = await fetch(`${HOSTNAME}/todos/user`, {
 		method: "GET",
 		headers: {
 			"Content-Type" : "application/json"
 		}
 	})
 	const data = await res.json();
 	setUsers(data);
 	};

	const obtenerTarea = async (user) => {
		const res = await fetch(`${HOSTNAME}/todos/user/${user}`, {
		method: "GET",
		headers: {
			"Content-Type" : "application/json"
		}
	})
	const data = await res.json();
	setTareas(data)

	};

	const agregarNombre = async () => {
		const res = await fetch(`${HOSTNAME}/todos/user/${title}`, {
		method: "POST",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify([])
		
	})
	const data = await res.json();
	console.log({data});
	listaNombres();
	};

	const agregarTareaNueva = async (nombre,tarea, estado) => {
		const res = await fetch(`${HOSTNAME}/todos/user/${nombre}`, {
		method: "PUT",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify([{label: tarea ,done: estado === "true"}])
	})
	const data = await res.json();
	listaNombres();
	};

	const eliminarNombre = async (t) => {
		const res = await fetch(`${HOSTNAME}/todos/user/${t}`, {
		method: "DELETE",
		headers: {
			"Content-Type" : "application/json"
		},
	})
	const data = await res.json();
	listaNombres();
	};
	
 	useEffect (async () => {
 		await listaNombres();
 	}, [])
	
	return (
		<div className="container d-flex ">
			<div className="ms-auto mt-3">
				<input onChange={event => setTitle(event.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
					<button type="button" className="btn btn-success mt-2" onClick={agregarNombre}>Agregar Usuario</button>
					<button type="button" className="btn btn-danger mt-2 ms-2" onClick={() => {eliminarNombre(title)}}>Eliminar Usuario</button>
				<input onChange={event => setUsuario(event.target.value)}  type="text" className="form-control mt-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ingrese usuario a modificar..."/>
				<input onChange={event => setTareaNueva(event.target.value)}  type="text" className="form-control mt-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Ingrese tarea..."/>
					<select onChange={event => setEstado(event.target.value)} className="form-select mt-2" aria-label="Default select example">
						<option  value="null">Elija una opcion...</option>
						<option  value="true">True</option>
  						<option  value="false">False</option>
					</select>
					<button onClick={()=>{agregarTareaNueva(usuario,tareaNueva,estado)}} type="button" className="btn btn-success mt-3">Agregar Tarea</button>
						<div className="mt-3">Tareas: 
							{tareas.map((tarea,index)=>{
								return (<div className="alert alert-warning mt-2" key={index} role="alert">
											<strong>{tarea.label}</strong>
				  						</div>)})}
						</div>
							
			</div>
			<ul className="list-group w-25 ms-auto mt-3">
				{users.map((user,index) => (
					<li className="list-group-item d-flex" key={index}>{user}
					<button onClick={()=>{obtenerTarea(user)}} type="button" className="btn btn-info ms-auto">Ver Tarea/s</button>
					</li>
				))}
  			</ul>
		</div>
	);
};

export default Home;
