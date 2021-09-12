import React from 'react';
import { Link } from "react-router-dom";
class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleado: []
        }
    }
    cambioValor = (e) => {

        const state = this.state.empleado;
        state[e.target.name] = e.target.value;
        this.setState({ empleado: state });
    }
//Editar y Guardar Datos del Formulario
    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");
        const { id_usuario, nombre_usuario, cedula_usuario, telefono_usuario, mail_usuario, estado_usuario } = this.state.empleado;
        console.log(id_usuario);
        console.log(nombre_usuario);
        console.log(cedula_usuario);
        console.log(telefono_usuario);
        console.log(mail_usuario);
        console.log(estado_usuario);

        var datosEnviar = { id: id_usuario, nombre: nombre_usuario, cedula: cedula_usuario, telefono: telefono_usuario, email: mail_usuario, estado: estado_usuario }

        fetch("http://localhost/empleados/?actualizar=1", {

            method: "POST",
            body: JSON.stringify(datosEnviar)
        })
            .then(respuesta => respuesta.json())
           
            .then((datosRespuesta) => {

                console.log(datosRespuesta);
                this.props.history.push("/");

            })
            .catch(console.log)
    }

//Cargar consulta en el formulario
    componentDidMount() {
        console.log(this.props.match.params.id);
        fetch("http://localhost/empleados/?consultar=" + this.props.match.params.id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {


                console.log("=>" + datosRespuesta);
                this.setState({
                    datosCargados: true,
                    empleado: datosRespuesta[0]
                })
            })
            .catch(console.log)

    }

//--------------------------------------------------------
    render() {
        const { datosCargados, empleado } = this.state

        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {
            return (
                <div className="card">
                    <div className="card-header">
                        Editar Empleado
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.enviarDatos}>

                            <div className="form-group">
                                <label htmlFor=""></label>
                                <input type="text" readOnly className="form-control" name="id" onChange={this.cambioValor} id="id" value={empleado.id_usuario} aria-describedby="helpId" placeholder="" />
                                <small id="helpId" className="form-text text-muted">Escribe el id del empleado</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Nombre</label>
                                <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={empleado.nombre_usuario} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Cedula</label>
                                <input type="text" name="cedula" id="cedula" onChange={this.cambioValor} value={empleado.cedula_usuario} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el Cedula del empleado</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Telefono</label>
                                <input type="text" name="telefono" id="telefono" onChange={this.cambioValor} value={empleado.telefono_usuario} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el Correo del empleado</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Email</label>
                                <input type="text" name="email" id="email" onChange={this.cambioValor} value={empleado.mail_usuario} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Escribe el Correo del empleado</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Estado</label>
                                <input type="text" name="estado" id="estado" onChange={this.cambioValor} value={empleado.estado_usuario} className="form-control" placeholder="" aria-describedby="helpId" />
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
}

export default Editar;