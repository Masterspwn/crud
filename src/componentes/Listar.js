import React from 'react';
import { Link } from "react-router-dom";
class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            empleados: []

        }
    }

    BorrarDatos = (id) => {

        console.log(id);

        fetch("http://localhost/empleados/?borrarLogico=" + id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {


                console.log(datosRespuesta);
                this.CargarDatos();

            })
            .catch(console.log)

    }



    CargarDatos() {
        fetch("http://localhost/empleados/")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {


                console.log(datosRespuesta);
                this.setState({ datosCargados: true, empleados: datosRespuesta })

            })
            .catch(console.log)

    }



    componentDidMount() {

        this.CargarDatos();

    }

    render() {
        const { datosCargados, empleados } = this.state
        if (!datosCargados) { return (<div>Cargando...</div>); }
        else {

            return (
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-success" to={"/Editar"}>Nuevo Empleado</Link>
                    </div>
                    <h4> Listar Empleados</h4>
                    <div className="card-body">
                        <table className="table table-striped table-inverse table-responsive">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Cedula</th>
                                    <th>Telefono</th>
                                    <th>Email</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>

                                {empleados.map(
                                    (empleado) => (
                                        <tr key={empleado.id_usuario}>
                                            <td>{empleado.id_usuario}</td>
                                            <td>{empleado.nombre_usuario}</td>
                                            <td>{empleado.cedula_usuario}</td>
                                            <td>{empleado.telefono_usuario}</td>
                                            <td>{empleado.mail_usuario}</td>
                                            <td>{empleado.estado_usuario}</td>
                                            <td><div className="btn-group" role="group" aria-label="">
                                                <Link className="btn btn-warning" 
                                                
                                                to={"/Editar/"+empleado.id_usuario}
                                                
                                                >Editar</Link>
                                                <Link className="btn btn-danger" to={"/"}
                                                    onClick={() => this.BorrarDatos(empleado.id_usuario)}
                                                >Eliminar</Link>

                                            </div></td>
                                        </tr>
                                    )
                                )
                                }


                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">

                    </div>
                </div>

            );
        }
    }
}

export default Listar;