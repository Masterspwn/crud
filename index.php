<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "crudreact";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM tbl_usuario  WHERE id_usuario=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"DELETE FROM TBL_USUARIO  WHERE id_usuario=".$_GET["borrar"]);
    if($sqlEmpleaados){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

//borrar Logico pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrarLogico"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"UPDATE tbl_usuario set estado_usuario='I' WHERE id_usuario=".$_GET["borrarLogico"]);
    if($sqlEmpleaados){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $id=$data->id;
    $nombre=$data->nombre;
    $cedula=$data->cedula;
    $telefono=$data->telefono;
    $email=$data->email;
    $estado=$data->estado;
    
        if(($nombre!="")&&($telefono!="")){
            
    $sqlEmpleaados = mysqli_query($conexionBD,"INSERT INTO tbl_usuario (id_usuario,nombre_usuario, cedula_usuario, telefono_usuario, mail_usuario, estado_usuario) VALUES('$id','$nombre','$cedula','$telefono','$email','$estado') ");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $cedula=$data->cedula;
    $telefono=$data->telefono;
    $email=$data->email;
    $estado=$data->estado;
    $sqlEmpleaados = mysqli_query($conexionBD,"UPDATE tbl_usuario  SET nombre_usuario='$nombre',cedula_usuario='$cedula',telefono_usuario='$telefono',mail_usuario='$email',estado_usuario='$estado' WHERE id_usuario='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla empleados
$sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM tbl_usuario WHERE estado_usuario='A'");
if(mysqli_num_rows($sqlEmpleaados) > 0){
    $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
    echo json_encode($empleaados);
}
else{ echo json_encode([["success"=>0]]); }


?>