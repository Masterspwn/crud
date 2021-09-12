import React from 'react';
import { Link } from "react-router-dom";
class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            nombre: "",
            cedula: "",
            telefono: "",
            email: "",
            estado: ""


        }
    }
    cambioValor = (e) => {

        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
    }

    
    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");
        const { id, nombre, cedula, telefono, email, estado } = this.state;
        console.log(id);
        console.log(nombre);
        console.log(cedula);
        console.log(telefono);
        console.log(email);
        console.log(estado);

        var datosEnviar = { id: id, nombre: nombre, cedula: cedula, telefono: telefono, email: email, estado: estado }

        fetch("http://localhost/empleados/?insertar=1", {

            method: "POST",
            body: JSON.stringify(datosEnviar)

        })
            .then(respuesta => respuesta.json())
           // .then(text=>console.log(text))
            
            .then((datosRespuesta) => {
                    
                    console.log(datosRespuesta);
                    this.props.history.push("/")

            })
            .catch(console.log)


    }

    render() {
        const { id, nombre, cedula, telefono, email, estado } = this.state;


        return (<div className="card">
            <div className="card-header">
                Empleados
            </div>
            <div className="card-body">
                <form onSubmit={this.enviarDatos}>
                    <div className="form-group">
                        <label htmlFor="">Id</label>
                        <input type="text" name="id" id="id" onChange={this.cambioValor} value={id} className="form-control" placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Escribe el Id del empleado</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={nombre} className="form-control" placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Cedula</label>
                        <input type="text" name="cedula" id="cedula" onChange={this.cambioValor} value={cedula} className="form-control" placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Escribe el Cedula del empleado</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Telefono</label>
                        <input type="text" name="telefono" id="telefono" onChange={this.cambioValor} value={telefono} className="form-control" placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Escribe el Correo del empleado</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" id="email" onChange={this.cambioValor} value={email} className="form-control" placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Escribe el Correo del empleado</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Estado</label>
                        <input type="text" name="estado" id="estado" onChange={this.cambioValor} value={estado} className="form-control" placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Escribe el Estado del empleado</small>
                    </div>


                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Nuevo empleado</button>
                        <Link type="button" className="btn btn-warning" to={"/"}>Cancel</Link>

                    </div>
                </form>
            </div>
            <div className="card-footer text-muted">

            </div>
        </div>);
    }
}

export default Crear;